# Backend API Endpoints Documentation

## Overview
This document describes the required API endpoints for the Birthday App reaction system.

## Base URL
```
http://localhost:3001/api
```

Set via environment variable: `VITE_API_URL`

---

## Endpoints

### 1. Get Employee Reactions
Get all reactions for a specific employee.

**Endpoint:** `GET /reactions/:employeeId`

**Response:**
```json
[
  {
    "id": "reaction-uuid",
    "employeeId": "employee-123",
    "deviceId": "device-abc",
    "reactionType": "love",
    "timestamp": 1699632000000
  }
]
```

---

### 2. Get Reaction Statistics
Get aggregated reaction statistics for an employee, including the current device's reaction.

**Endpoint:** `GET /reactions/:employeeId/stats?deviceId={deviceId}`

**Query Parameters:**
- `deviceId` (required): The unique device identifier

**Response:**
```json
{
  "employeeId": "employee-123",
  "reactions": {
    "like": 5,
    "love": 12,
    "celebrate": 8,
    "clap": 3,
    "fire": 7
  },
  "totalReactions": 35,
  "userReaction": "love"
}
```

---

### 3. Get Bulk Reaction Statistics
Get reaction statistics for multiple employees at once (for optimization).

**Endpoint:** `POST /reactions/stats/bulk`

**Request Body:**
```json
{
  "employeeIds": ["employee-123", "employee-456"],
  "deviceId": "device-abc"
}
```

**Response:**
```json
{
  "employee-123": {
    "employeeId": "employee-123",
    "reactions": {
      "like": 5,
      "love": 12,
      "celebrate": 8,
      "clap": 3,
      "fire": 7
    },
    "totalReactions": 35,
    "userReaction": "love"
  },
  "employee-456": {
    "employeeId": "employee-456",
    "reactions": {
      "like": 2,
      "love": 5,
      "celebrate": 3,
      "clap": 1,
      "fire": 4
    },
    "totalReactions": 15,
    "userReaction": null
  }
}
```

---

### 4. Add Reaction
Add a new reaction from a device to an employee.

**Endpoint:** `POST /reactions`

**Request Body:**
```json
{
  "employeeId": "employee-123",
  "deviceId": "device-abc",
  "reactionType": "love"
}
```

**Response:**
```json
{
  "id": "reaction-uuid",
  "employeeId": "employee-123",
  "deviceId": "device-abc",
  "reactionType": "love",
  "timestamp": 1699632000000
}
```

**Business Logic:**
- Check if device already has a reaction for this employee
- If yes, return error or update existing reaction
- If no, create new reaction

---

### 5. Update Reaction
Update an existing reaction (change reaction type).

**Endpoint:** `PUT /reactions/:employeeId`

**Request Body:**
```json
{
  "employeeId": "employee-123",
  "deviceId": "device-abc",
  "reactionType": "celebrate"
}
```

**Response:**
```json
{
  "id": "reaction-uuid",
  "employeeId": "employee-123",
  "deviceId": "device-abc",
  "reactionType": "celebrate",
  "timestamp": 1699632100000
}
```

**Business Logic:**
- Find existing reaction by employeeId + deviceId
- Update reactionType and timestamp
- Return updated reaction

---

### 6. Remove Reaction
Remove a device's reaction from an employee.

**Endpoint:** `DELETE /reactions/:employeeId?deviceId={deviceId}`

**Query Parameters:**
- `deviceId` (required): The unique device identifier

**Response:**
```
204 No Content
```

**Business Logic:**
- Find and delete reaction by employeeId + deviceId
- Return 204 on success

---

## Data Models

### Reaction
```typescript
{
  id: string;              // Unique reaction ID
  employeeId: string;      // Employee receiving the reaction
  deviceId: string;        // Device that gave the reaction
  reactionType: 'like' | 'love' | 'celebrate' | 'clap' | 'fire';
  timestamp: number;       // Unix timestamp in milliseconds
}
```

### ReactionStats
```typescript
{
  employeeId: string;
  reactions: {
    like: number;
    love: number;
    celebrate: number;
    clap: number;
    fire: number;
  };
  totalReactions: number;
  userReaction?: 'like' | 'love' | 'celebrate' | 'clap' | 'fire';
}
```

---

## Error Responses

All endpoints should return appropriate HTTP status codes:

- `200 OK` - Successful GET/PUT
- `201 Created` - Successful POST
- `204 No Content` - Successful DELETE
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

**Error Response Format:**
```json
{
  "error": "Error message description",
  "code": "ERROR_CODE"
}
```

---

## Database Schema Suggestion

### reactions table
```sql
CREATE TABLE reactions (
  id VARCHAR(255) PRIMARY KEY,
  employee_id VARCHAR(255) NOT NULL,
  device_id VARCHAR(255) NOT NULL,
  reaction_type ENUM('like', 'love', 'celebrate', 'clap', 'fire') NOT NULL,
  timestamp BIGINT NOT NULL,
  UNIQUE KEY unique_device_employee (device_id, employee_id),
  INDEX idx_employee (employee_id),
  INDEX idx_device (device_id)
);
```

The `UNIQUE KEY` constraint ensures one reaction per device per employee.
