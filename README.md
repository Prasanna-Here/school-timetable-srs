# School Time Table Management System

A full-stack application for managing school timetables with React frontend and Spring Boot backend.

## Features

- User authentication (Admin, Teacher, Student roles)
- Schedule management
- Class, Subject, Room, and TimeSlot management
- Role-based access control
- Responsive design with Material-UI

## Tech Stack

### Frontend
- React 19
- Vite
- Material-UI
- React Router
- Axios

### Backend
- Spring Boot 3.5.5
- Spring Security
- JWT Authentication
- MySQL Database
- Maven

## Local Development Setup

### Prerequisites
- Node.js 18+
- Java 21+
- MySQL 8.0+
- Maven (or use Maven wrapper)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a MySQL database named `timetable`

3. Update `src/main/resources/application.properties` with your database credentials:
   ```properties
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

4. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

The backend will be available at `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## Deployment

### Netlify Deployment (Frontend)

1. Connect your repository to Netlify
2. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
   - Base directory: `frontend`

3. Set environment variables in Netlify:
   - `VITE_API_BASE_URL`: Your backend API URL

### Backend Deployment Options

#### Option 1: Heroku
1. Create a Heroku app
2. Add MySQL addon (JawsDB or ClearDB)
3. Set environment variables:
   - `DATABASE_URL`: Your database URL
   - `JWT_SECRET`: A secure secret key
   - `CORS_ALLOWED_ORIGINS`: Your frontend URL

#### Option 2: Railway
1. Connect your repository to Railway
2. Add MySQL service
3. Set environment variables as above

### Environment Variables

#### Backend Environment Variables
- `DATABASE_URL`: Database connection string
- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password
- `JWT_SECRET`: Secret key for JWT tokens
- `JWT_EXPIRATION`: Token expiration time (default: 36000000)
- `CORS_ALLOWED_ORIGINS`: Comma-separated list of allowed origins
- `PORT`: Server port (default: 8080)

#### Frontend Environment Variables
- `VITE_API_BASE_URL`: Backend API URL

## Default Data

The application automatically creates sample classes (10A, 10B, 11A, 11B) on first run.

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Protected Endpoints
- `GET /api/schedules` - Get schedules
- `POST /api/schedules` - Create schedule
- `GET /api/users` - Get users (Admin only)
- `GET /api/classes` - Get classes
- `GET /api/subjects` - Get subjects
- `GET /api/rooms` - Get rooms
- `GET /api/timeslots` - Get time slots

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your backend CORS configuration includes your frontend URL
2. **Database Connection**: Verify your database credentials and connection string
3. **Build Failures**: Check Node.js and Java versions match requirements

### Development Tips

- Use `npm run build` to test production build locally
- Check browser console for API errors
- Verify environment variables are set correctly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
