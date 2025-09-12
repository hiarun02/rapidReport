import {execSync} from "child_process";
import {existsSync, readFileSync, writeFileSync} from "fs";
import {join} from "path";

interface BuildConfig {
  clientPath: string;
  serverPath: string;
  requiredEnvVars: {
    client: string[];
    server: string[];
  };
}

const config: BuildConfig = {
  clientPath: "./client",
  serverPath: "./server",
  requiredEnvVars: {
    client: ["VITE_API_URL"],
    server: [
      "MONGODB_URI",
      "CLOUDINARY_CLOUD_NAME",
      "CLOUDINARY_API_KEY",
      "CLOUDINARY_API_SECRET",
      "SESSION_SECRET",
    ],
  },
};

// Utility functions
const checkFileExists = (filePath: string): boolean => {
  return existsSync(filePath);
};

const runCommand = (command: string, cwd?: string): string => {
  try {
    return execSync(command, {
      cwd: cwd || process.cwd(),
      encoding: "utf8",
      stdio: "pipe",
    });
  } catch (error) {
    throw new Error(`Command failed: ${command}\n${error}`);
  }
};

const checkEnvironmentVariables = (
  envPath: string,
  requiredVars: string[]
): boolean => {
  console.log(`📋 Checking environment variables in ${envPath}...`);

  if (!checkFileExists(envPath)) {
    console.warn(`⚠️  Environment file not found: ${envPath}`);
    return false;
  }

  const envContent = readFileSync(envPath, "utf8");
  const missingVars: string[] = [];

  requiredVars.forEach((varName) => {
    if (
      !envContent.includes(`${varName}=`) ||
      envContent.includes(`${varName}=`)
    ) {
      const regex = new RegExp(`^${varName}=.+$`, "m");
      if (!regex.test(envContent)) {
        missingVars.push(varName);
      }
    }
  });

  if (missingVars.length > 0) {
    console.error(
      `❌ Missing environment variables: ${missingVars.join(", ")}`
    );
    return false;
  }

  console.log(`✅ All required environment variables are present`);
  return true;
};

const checkDependencies = (packagePath: string): boolean => {
  console.log(`📦 Checking dependencies in ${packagePath}...`);

  if (!checkFileExists(join(packagePath, "package.json"))) {
    console.error(`❌ package.json not found in ${packagePath}`);
    return false;
  }

  if (!checkFileExists(join(packagePath, "node_modules"))) {
    console.log(`📥 Installing dependencies in ${packagePath}...`);
    try {
      runCommand("npm install", packagePath);
      console.log(`✅ Dependencies installed successfully`);
    } catch (error) {
      console.error(`❌ Failed to install dependencies: ${error}`);
      return false;
    }
  } else {
    console.log(`✅ Dependencies already installed`);
  }

  return true;
};

const lintCode = (projectPath: string): boolean => {
  console.log(`🔍 Running linter in ${projectPath}...`);

  try {
    const packageJson = JSON.parse(
      readFileSync(join(projectPath, "package.json"), "utf8")
    );

    if (packageJson.scripts && packageJson.scripts.lint) {
      runCommand("npm run lint", projectPath);
      console.log(`✅ Linting passed`);
      return true;
    } else {
      console.log(`⚠️  No lint script found, skipping...`);
      return true;
    }
  } catch (error) {
    console.error(`❌ Linting failed: ${error}`);
    return false;
  }
};

const checkTypeScript = (projectPath: string): boolean => {
  console.log(`🔷 Checking TypeScript in ${projectPath}...`);

  const tsconfigPath = join(projectPath, "tsconfig.json");
  if (!checkFileExists(tsconfigPath)) {
    console.log(`⚠️  No tsconfig.json found, skipping TypeScript check...`);
    return true;
  }

  try {
    runCommand("npx tsc --noEmit", projectPath);
    console.log(`✅ TypeScript check passed`);
    return true;
  } catch (error) {
    console.error(`❌ TypeScript check failed: ${error}`);
    return false;
  }
};

const generateBuildInfo = (): void => {
  console.log(`📝 Generating build information...`);

  const buildInfo = {
    buildTime: new Date().toISOString(),
    version: process.env.npm_package_version || "1.0.0",
    nodeVersion: process.version,
    environment: process.env.NODE_ENV || "development",
    gitCommit: (() => {
      try {
        return runCommand("git rev-parse HEAD").trim();
      } catch {
        return "unknown";
      }
    })(),
    gitBranch: (() => {
      try {
        return runCommand("git rev-parse --abbrev-ref HEAD").trim();
      } catch {
        return "unknown";
      }
    })(),
  };

  // Write build info to client public directory
  const clientBuildInfoPath = join(
    config.clientPath,
    "public",
    "build-info.json"
  );
  writeFileSync(clientBuildInfoPath, JSON.stringify(buildInfo, null, 2));

  console.log(`✅ Build information generated`);
  console.log(`   Version: ${buildInfo.version}`);
  console.log(`   Commit: ${buildInfo.gitCommit.substring(0, 8)}`);
  console.log(`   Branch: ${buildInfo.gitBranch}`);
};

const checkSecurityVulnerabilities = (projectPath: string): boolean => {
  console.log(`🔒 Checking for security vulnerabilities in ${projectPath}...`);

  try {
    const auditResult = runCommand("npm audit --audit-level=high", projectPath);

    if (auditResult.includes("found 0 vulnerabilities")) {
      console.log(`✅ No high-severity vulnerabilities found`);
      return true;
    } else {
      console.warn(`⚠️  Security vulnerabilities detected:`);
      console.log(auditResult);

      // Try to fix automatically
      try {
        runCommand("npm audit fix", projectPath);
        console.log(`✅ Attempted to fix vulnerabilities automatically`);
        return true;
      } catch {
        console.warn(
          `⚠️  Could not auto-fix vulnerabilities. Please review manually.`
        );
        return true; // Don't fail build, but warn
      }
    }
  } catch (error) {
    console.warn(`⚠️  Could not run security audit: ${error}`);
    return true; // Don't fail build if audit fails
  }
};

const validateProjectStructure = (): boolean => {
  console.log(`🏗️  Validating project structure...`);

  const requiredPaths = [
    config.clientPath,
    config.serverPath,
    join(config.clientPath, "src"),
    join(config.clientPath, "public"),
    join(config.serverPath, "Controllers"),
    join(config.serverPath, "models"),
    join(config.serverPath, "routes"),
  ];

  const missingPaths: string[] = [];

  requiredPaths.forEach((path) => {
    if (!checkFileExists(path)) {
      missingPaths.push(path);
    }
  });

  if (missingPaths.length > 0) {
    console.error(
      `❌ Missing required directories: ${missingPaths.join(", ")}`
    );
    return false;
  }

  console.log(`✅ Project structure is valid`);
  return true;
};

// Main pre-build execution
async function runPreBuildChecks(): Promise<void> {
  console.log(
    `\n🚀 Starting pre-build checks for Community Safety Report System\n`
  );

  const checks = [
    {name: "Project Structure", fn: () => validateProjectStructure()},
    {
      name: "Client Dependencies",
      fn: () => checkDependencies(config.clientPath),
    },
    {
      name: "Server Dependencies",
      fn: () => checkDependencies(config.serverPath),
    },
    {
      name: "Client Environment",
      fn: () =>
        checkEnvironmentVariables(
          join(config.clientPath, ".env"),
          config.requiredEnvVars.client
        ),
    },
    {
      name: "Server Environment",
      fn: () =>
        checkEnvironmentVariables(
          join(config.serverPath, ".env"),
          config.requiredEnvVars.server
        ),
    },
    {name: "Client TypeScript", fn: () => checkTypeScript(config.clientPath)},
    {name: "Client Linting", fn: () => lintCode(config.clientPath)},
    {
      name: "Client Security",
      fn: () => checkSecurityVulnerabilities(config.clientPath),
    },
    {
      name: "Server Security",
      fn: () => checkSecurityVulnerabilities(config.serverPath),
    },
  ];

  const results: {name: string; passed: boolean}[] = [];

  for (const check of checks) {
    try {
      const passed = check.fn();
      results.push({name: check.name, passed});

      if (!passed) {
        console.error(`❌ ${check.name} check failed`);
      }
    } catch (error) {
      console.error(`❌ ${check.name} check failed with error: ${error}`);
      results.push({name: check.name, passed: false});
    }
    console.log(""); // Add spacing between checks
  }

  // Generate build info regardless of check results
  generateBuildInfo();

  // Summary
  console.log(`\n📊 Pre-build Check Summary:`);
  console.log(`${"=".repeat(50)}`);

  const passed = results.filter((r) => r.passed).length;
  const total = results.length;

  results.forEach((result) => {
    const status = result.passed ? "✅" : "❌";
    console.log(`${status} ${result.name}`);
  });

  console.log(`${"=".repeat(50)}`);
  console.log(`📈 Results: ${passed}/${total} checks passed`);

  if (passed === total) {
    console.log(`\n🎉 All pre-build checks passed! Ready to build.`);
  } else {
    console.log(
      `\n⚠️  Some checks failed. Please review and fix issues before building.`
    );

    // Don't exit with error in development, just warn
    if (process.env.NODE_ENV === "production") {
      console.log(
        `\n❌ Failing build due to failed checks in production environment.`
      );
      process.exit(1);
    } else {
      console.log(
        `\n⚠️  Continuing build in development environment despite failures.`
      );
    }
  }

  console.log(`\n🏁 Pre-build checks completed.\n`);
}

// Execute the pre-build checks
runPreBuildChecks().catch((error) => {
  console.error(`\n💥 Pre-build checks failed with error:`, error);
  process.exit(1);
});
