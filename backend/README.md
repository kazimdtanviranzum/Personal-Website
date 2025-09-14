# Rashed Sir Website Backend

A robust Express.js backend API for managing academic website content with MongoDB and Mongoose.

## Features

- 🔐 **Admin Authentication**: JWT-based authentication with role-based access control
- 🛡️ **Security**: Rate limiting, CORS, Helmet security headers
- 📊 **Content Management**: Full CRUD operations for all content types
- 🔍 **Search**: Advanced search across all content types
- 📝 **Validation**: Comprehensive input validation with Joi
- 🗄️ **Database**: MongoDB with Mongoose ODM
- 📈 **Dashboard**: Admin dashboard with statistics

## Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Start MongoDB:**
   Make sure MongoDB is running on your system or provide a MongoDB Atlas connection string.

4. **Seed the database:**
   ```bash
   npm run seed
   ```

5. **Start the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/rashed_sir_website` |
| `JWT_SECRET` | JWT secret key | Required |
| `JWT_EXPIRES_IN` | JWT expiration time | `7d` |
| `NODE_ENV` | Environment | `development` |
| `ADMIN_EMAIL` | Default admin email | `admin@example.com` |
| `ADMIN_PASSWORD` | Default admin password | `admin123` |

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/profile` - Get admin profile
- `POST /api/auth/change-password` - Change password
- `GET /api/auth/verify` - Verify token
- `POST /api/auth/logout` - Logout

### Admin Management
- `GET /api/admin/admins` - Get all admins (super_admin only)
- `POST /api/admin/admins` - Create new admin (super_admin only)
- `PUT /api/admin/admins/:id` - Update admin (super_admin only)
- `DELETE /api/admin/admins/:id` - Delete admin (super_admin only)
- `GET /api/admin/dashboard` - Dashboard statistics

### Content Management
- `GET /api/content/personal` - Get personal information
- `PUT /api/content/personal` - Update personal information (admin only)

For all content types (education, experience, publications, research, news, scholarships-awards, teaching):
- `GET /api/content/{type}` - Get all items with pagination
- `GET /api/content/{type}/:id` - Get single item
- `POST /api/content/{type}` - Create item (admin only)
- `PUT /api/content/{type}/:id` - Update item (admin only)
- `DELETE /api/content/{type}/:id` - Delete item (admin only)

### Search
- `GET /api/content/search?q={query}&type={type}` - Search across content

## Data Models

### Personal Information
- Basic profile information
- Contact details
- Social media links

### Education
- Degree, institution, year
- CGPA, description

### Experience
- Position, organization
- Start/end dates
- Responsibilities

### Publications
- Title, authors, journal
- Year, DOI, abstract
- Publication type

### Research
- Title, description
- Keywords, collaborators
- Status, funding

### News
- Title, content, date
- Category, featured status
- Image, external link

### Scholarships & Awards
- Title, organization, year
- Amount, description, type

### Teaching
- Course code/name
- Semester, year, level
- Credits, student count

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting (100 requests per 15 minutes)
- Account lockout after failed login attempts
- Input validation and sanitization
- CORS configuration
- Security headers with Helmet

## Default Admin

After running the seed command, a default admin account will be created:
- **Email**: admin@example.com (or your configured ADMIN_EMAIL)
- **Password**: admin123 (or your configured ADMIN_PASSWORD)

⚠️ **Important**: Change the default password immediately after first login!

## Development

```bash
# Install dependencies
npm install

# Run in development mode with nodemon
npm run dev

# Run in production mode
npm start

# Seed database
npm run seed
```

## Error Handling

The API includes comprehensive error handling:
- Validation errors (400)
- Authentication errors (401)
- Authorization errors (403)
- Not found errors (404)
- Account locked errors (423)
- Server errors (500)

## Response Format

All API responses follow this format:
```json
{
  "success": true/false,
  "message": "Response message",
  "data": {
    // Response data
  },
  "errors": [
    // Validation errors (if any)
  ]
}
```
