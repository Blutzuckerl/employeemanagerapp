# Employee Manager App (Angular)

## Overview
This repository contains an Angular frontend for managing students/employees via a REST backend.
The UI supports listing, creating, updating, deleting, and searching records.

## Main Features
- List all entries from backend (`GET /student/all`)
- Create new entries (`POST /student/add`)
- Update existing entries (`PUT /student/update`)
- Delete entries (`DELETE /student/delete/{id}`)
- Client-side search across multiple fields (name, email, phone, alias, subject, hobby, etc.)
- Modal-based create/edit/delete workflows

## Tech Stack
- Angular 19
- TypeScript
- RxJS + HttpClient
- Karma/Jasmine for tests

## Project Structure
- `src/app/app.component.ts`: main view logic and CRUD handlers
- `src/app/employee.service.ts`: REST API service
- `src/app/employee.ts`: data model interface
- `src/environments/environment.ts`: local API base URL configuration

## Requirements
- Node.js 20+ (recommended)
- npm 10+
- Running backend API (default expected: `http://localhost:8080`)

## Local Development
```bash
npm ci
npm start
```
Open: `http://localhost:4200`

## Build and Test
```bash
npm run build
npm test
```

## API Notes
The frontend expects a backend with these endpoints:
- `GET /student/all`
- `GET /student/find/id/{id}`
- `GET /student/find/code/{studentCode}`
- `POST /student/add`
- `PUT /student/update`
- `DELETE /student/delete/{id}`

## Security and Data Hygiene
- Do not commit real personal data.
- Keep secrets in local `.env` files only.
- Keep local database dumps, certificates, and backups out of git.
