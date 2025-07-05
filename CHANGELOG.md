# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- MercadoPago Checkout Pro integration
- Payment processing service with preference creation
- Webhook endpoint for payment notifications
- Payment failure page with user-friendly error handling and smooth animations
- Payment pending page for processing status with engaging animations
- Payment confirmation system in subscriber_resource table
- Secure payment flow with automatic redirection
- Consistent UX across all payment status pages using Framer Motion
- Resource API with CRUD operations
- New resource management page
- Enhanced UX improvements
- Comprehensive test coverage

### Changed

- Refactored payment failure and pending pages to match CongratsScreen UX consistency
- Enhanced payment status pages with Framer Motion animations and color-coded themes
- Registration form now includes payment flow integration
- Modified subscription process to include payment confirmation
- Enhanced user experience with payment status feedback
- Updated registration form to show pricing information
- Improved visual feedback with themed colors (red for failure, yellow for pending)
- Added wave background and consistent layout across payment status pages
- Implemented real-time updates for resources page
- Modified API route configuration to support dynamic data
- Optimized Next.js configuration for real-time data handling
- Resolved build issues related to dynamic server usage
- Improved Jest configuration
- Enhanced form validations
- Optimized database queries
- Updated UI text from "Número de Sesiones" to "Cantidad de Encuentros"
- Enhanced ResourcesCards layout and responsiveness
- Improved date display in resource cards
- Migrated calendar component to use DayPicker directly

### Technical

- Integrated Framer Motion for smooth page transitions and animations
- Created consistent component architecture across payment status pages
- Enhanced error handling with animated feedback components
- Integrated MercadoPago SDK for payment processing
- Created MercadoPagoService class for payment operations
- Implemented webhook handling for payment status updates
- Added payment confirmation logic in DataSource
- Enhanced error handling for payment failures
- Added `dynamic = "force-dynamic"` in resources page
- Removed cache and revalidation in resource endpoints
- Updated fetch configuration to maintain fresh data
- Type-safe operations implementation
- Better error handling
- Performance optimizations
- Removed redundant calendar component and integrated DayPicker directly
- Improved grid layout for resource cards
- **Major refactor**: Completely restructured MercadoPago webhook handler for better maintainability and scalability
- Created modular architecture with separate handlers, validators, services, and error classes
- Implemented SOLID principles with dependency injection and single responsibility
- Added comprehensive type safety with custom TypeScript interfaces
- Created scalable error handling system with custom error classes
- Implemented PaymentApprovalHandler for orchestrating payment approval workflow
- Added PaymentProcessingService for database operations separation
- Created NotificationService for email handling abstraction
- Implemented WebhookValidator and PaymentValidator for input validation
- Added comprehensive test coverage for the new webhook architecture
- Reduced route handler complexity from 81 lines to 25 lines
- Improved code testability and maintainability through dependency injection
- **MercadoPago webhook compliance**: Modified webhook handler to always return 200 status codes to maintain webhook connection flow
- **Enhanced updateSubscriberResource method**: Improved data retrieval to return complete updated subscriber resource data with nested relationships for better logging
- **Improved PaymentProcessingService logging**: Enhanced logging to include detailed information about updated subscriber resources using the improved updateSubscriberResource method
- **Enhanced email deliverability**: Improved email service with anti-spam headers, List-Unsubscribe support, and MIME structure optimization
- **Reduced spam triggers in emails**: Removed excessive emojis, improved HTML structure, and added plain text versions to confirmation emails
- **Restored original email design**: Reverted to the original clean, simple email layout while removing emojis that triggered spam filters
