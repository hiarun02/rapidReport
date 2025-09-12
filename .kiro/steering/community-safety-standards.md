# Community Safety Report System - Development Standards

## Project Overview

This steering file contains development standards, coding practices, and architectural guidelines for the Community Safety Report System - a React-based web application for incident reporting and administrative management.

## Technology Stack

- **Frontend**: React 18+ with TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Package Manager**: npm
- **API**: RESTful endpoints
- **File Storage**: Cloud storage for image uploads

## Code Standards

### TypeScript Guidelines

- Use strict TypeScript configuration
- Define interfaces for all data structures
- Use proper typing for props, state, and API responses
- Avoid `any` type - use proper type definitions
- Use union types for status fields: `"pending" | "resolved"`

### React Component Standards

- Use functional components with hooks
- Follow the component structure from feature-spec.json
- Implement proper prop validation with TypeScript interfaces
- Use descriptive component and prop names
- Keep components focused on single responsibilities

### File Organization

```
client/src/
├── components/
│   ├── admin/
│   │   ├── dashboard/
│   │   └── login/
│   ├── pages/
│   └── shared/
├── store/
│   ├── slices/
│   └── index.ts
├── types/
├── utils/
└── api/
```

### Naming Conventions

- **Components**: PascalCase (e.g., `ReportForm`, `AdminDashboard`)
- **Files**: PascalCase for components, camelCase for utilities
- **Variables/Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **CSS Classes**: Tailwind utility classes

## Data Models

### Report Interface

```typescript
interface Report {
  id: string;
  title: string;
  description: string;
  location: string;
  image?: string;
  status: "pending" | "resolved";
  createdAt: Date;
  updatedAt: Date;
}
```

### Admin Stats Interface

```typescript
interface AdminStats {
  totalReports: number;
  pending: number;
  resolved: number;
}
```

## API Standards

### Endpoint Patterns

- `POST /api/report` - Create new report
- `GET /api/reports` - Fetch all reports
- `GET /api/report/:id` - Fetch specific report
- `PATCH /api/report/:id` - Update report status
- `GET /api/admin/reports` - Admin: fetch all reports
- `GET /api/admin/stats` - Admin: fetch statistics

### Response Format

```typescript
// Success Response
{
  success: true,
  data: T,
  message?: string
}

// Error Response
{
  success: false,
  error: string,
  details?: any
}
```

## State Management

### Redux Store Structure

- `reportSlice`: Handle user-facing report operations
- `adminSlice`: Handle administrative operations
- Use RTK Query for API calls
- Implement proper loading and error states

### Slice Patterns

```typescript
// Standard slice structure
{
  data: T[],
  loading: boolean,
  error: string | null
}
```

## UI/UX Guidelines

### Design Principles

- Mobile-first responsive design
- Accessibility compliance (WCAG 2.1 AA)
- Clear visual hierarchy
- Consistent spacing using Tailwind scale
- Emergency-focused color scheme (red for urgent, blue for info)

### Component Patterns

- Loading states for all async operations
- Error boundaries for graceful error handling
- Form validation with clear error messages
- Success notifications for completed actions
- Confirmation dialogs for destructive actions

### Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Security Requirements

### Data Protection

- Validate all user inputs
- Sanitize data before storage
- Use HTTPS for all communications
- Implement proper authentication for admin routes
- Secure image upload handling

### Privacy Considerations

- Minimal data collection
- Secure storage of sensitive information
- Clear data retention policies
- User consent for location services

## Testing Standards

### Unit Testing

- Test all utility functions
- Test component rendering and interactions
- Test Redux slices and actions
- Minimum 80% code coverage

### Integration Testing

- Test API endpoint integration
- Test form submissions end-to-end
- Test admin dashboard workflows

## Performance Guidelines

### Optimization Targets

- Initial page load: < 3 seconds
- Form submission: < 2 seconds
- Search/filter operations: < 1 second
- Image upload: < 10 seconds

### Best Practices

- Lazy load non-critical components
- Optimize images before upload
- Use React.memo for expensive components
- Implement proper error boundaries
- Cache API responses where appropriate

## Error Handling

### User-Facing Errors

- Display clear, actionable error messages
- Provide retry mechanisms for failed operations
- Show loading states during operations
- Implement graceful degradation for offline scenarios

### Development Errors

- Use proper error logging
- Implement error boundaries
- Provide detailed error information in development
- Use TypeScript for compile-time error prevention

## Accessibility Standards

### Requirements

- Keyboard navigation support
- Screen reader compatibility
- Proper ARIA labels and roles
- Color contrast compliance
- Focus management
- Alternative text for images

### Implementation

- Use semantic HTML elements
- Implement proper form labels
- Provide skip navigation links
- Ensure interactive elements are focusable
- Test with screen readers

## Development Workflow

### Code Quality

- Use ESLint and Prettier for code formatting
- Implement pre-commit hooks for code quality
- Use TypeScript strict mode
- Regular code reviews
- Automated testing in CI/CD

### Git Practices

- Use conventional commit messages
- Feature branch workflow
- Squash commits before merging
- Tag releases appropriately

## Emergency Considerations

### Critical Features

- Report submission must always work
- Emergency contact buttons must be immediately accessible
- Admin dashboard must handle high loads
- System must gracefully handle failures

### Fallback Mechanisms

- Offline form submission queuing
- Alternative contact methods if primary fails
- Manual location entry if GPS fails
- Basic functionality without JavaScript

## Deployment Standards

### Environment Configuration

- Separate configs for development, staging, production
- Environment variables for sensitive data
- Proper error monitoring and logging
- Performance monitoring and alerts

### Release Process

- Automated testing before deployment
- Database migration scripts
- Rollback procedures
- Health checks post-deployment

---

_This steering file should be referenced for all development work on the Community Safety Report System. Updates to these standards should be reviewed and approved by the development team._
