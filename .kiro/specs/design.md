# JanSahay AI – System Design Document
## AI-Powered Government Scheme Recommendation Platform

---

## Document Information

| Field | Value |
|-------|-------|
| **Project Name** | JanSahay AI |
| **Document Type** | System Design Document |
| **Version** | 1.0 |
| **Date** | February 14, 2026 |
| **Status** | Final |
| **Author** | Development Team |

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [System Architecture Overview](#2-system-architecture-overview)
3. [Component Architecture](#3-component-architecture)
4. [Data Architecture](#4-data-architecture)
5. [API Design](#5-api-design)
6. [Security Architecture](#6-security-architecture)
7. [Deployment Architecture](#7-deployment-architecture)
8. [Scalability Strategy](#8-scalability-strategy)
9. [Future Enhancements](#9-future-enhancements)

---

## 1. Introduction

### 1.1 Purpose
This document provides a comprehensive technical design for JanSahay AI, an AI-powered platform that helps Indian citizens discover and access government welfare schemes through conversational AI and intelligent recommendation systems.

### 1.2 Scope
The design covers:
- System architecture and component interactions
- Database schema and data models
- API endpoint specifications
- Security mechanisms
- Deployment strategy
- Scalability considerations

### 1.3 Design Principles
- **Simplicity**: Minimal dependencies, straightforward architecture
- **Accessibility**: Multi-language support, mobile-first design
- **Maintainability**: Modular code, clear separation of concerns
- **Scalability**: Horizontal scaling capability
- **Security**: Input validation, secure API communication


---

## 2. System Architecture Overview

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐     │
│  │   Web Browser    │  │   Mobile Browser │  │   Tablet Browser │     │
│  │   (Desktop)      │  │   (iOS/Android)  │  │                  │     │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘     │
└───────────┼────────────────────┼────────────────────┼─────────────────┘
            │                    │                    │
            └────────────────────┼────────────────────┘
                                 │
                          HTTPS/REST API
                                 │
┌────────────────────────────────┼─────────────────────────────────────────┐
│                         PRESENTATION LAYER                                │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                    Static File Server (Frontend)                  │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌───────────┐  │   │
│  │  │ index.html │  │  main.css  │  │   app.js   │  │  chat.js  │  │   │
│  │  └────────────┘  └────────────┘  └────────────┘  └───────────┘  │   │
│  │  ┌────────────┐                                                   │   │
│  │  │ admin.js   │                                                   │   │
│  │  └────────────┘                                                   │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────┘
                                 │
                          JSON over HTTP
                                 │
┌────────────────────────────────┼─────────────────────────────────────────┐
│                          APPLICATION LAYER                                │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                      Flask Application (app.py)                   │   │
│  │  ┌────────────────────────────────────────────────────────────┐  │   │
│  │  │                      Route Handlers                         │  │   │
│  │  │  /chat  /check-eligibility  /schemes  /schemes/<id>        │  │   │
│  │  └────────────────────────────────────────────────────────────┘  │   │
│  │  ┌────────────────────────────────────────────────────────────┐  │   │
│  │  │                    Business Logic Layer                     │  │   │
│  │  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │  │   │
│  │  │  │ Recommender  │  │  Eligibility │  │  Translator  │     │  │   │
│  │  │  │   Engine     │  │    Checker   │  │    Service   │     │  │   │
│  │  │  └──────────────┘  └──────────────┘  └──────────────┘     │  │   │
│  │  └────────────────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────┘
                                 │
                          SQLAlchemy ORM
                                 │
┌────────────────────────────────┼─────────────────────────────────────────┐
│                            DATA LAYER                                     │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                      Database (SQLite/PostgreSQL)                 │   │
│  │  ┌────────────────────────────────────────────────────────────┐  │   │
│  │  │                       Scheme Table                          │  │   │
│  │  │  - Basic Info (name, description, benefits)                 │  │   │
│  │  │  - Eligibility Criteria (age, income, gender, etc.)         │  │   │
│  │  │  - Search Metadata (keywords, categories)                   │  │   │
│  │  └────────────────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────┘
                                 │
┌────────────────────────────────┼─────────────────────────────────────────┐
│                         EXTERNAL SERVICES                                 │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                    Google Translator API                          │   │
│  │  (Hindi, Kannada, Telugu, Tamil, Malayalam Translation)          │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                    Web Speech API (Browser)                       │   │
│  │  (Voice Input - Client Side)                                     │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Architecture Style
- **Pattern**: Three-tier architecture (Presentation, Application, Data)
- **Communication**: RESTful API with JSON payloads
- **State Management**: Stateless server, session data in client
- **Data Flow**: Request-Response pattern with synchronous processing

### 2.3 Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript | User interface and interaction |
| **Backend** | Python 3.8+, Flask 2.x | API server and business logic |
| **Database** | SQLite (dev), PostgreSQL (prod) | Data persistence |
| **ORM** | SQLAlchemy | Database abstraction |
| **Translation** | Google Translator API | Multi-language support |
| **Voice** | Web Speech API | Voice input capability |
| **Deployment** | Gunicorn, Heroku/AWS | Production hosting |



---

## 3. Component Architecture

### 3.1 Frontend Components

#### 3.1.1 Chat Interface (chat.js)
```
┌─────────────────────────────────────────────────────────┐
│                    Chat Component                        │
│  ┌───────────────────────────────────────────────────┐  │
│  │  User Input Handler                               │  │
│  │  - Text input capture                             │  │
│  │  - Voice input integration                        │  │
│  │  - Language selection                             │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Message Display Manager                          │  │
│  │  - User message rendering                         │  │
│  │  - Bot response rendering                         │  │
│  │  - Scheme card display                            │  │
│  │  - Auto-scroll management                         │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  API Communication Layer                          │  │
│  │  - POST /chat requests                            │  │
│  │  - Response parsing                               │  │
│  │  - Error handling                                 │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Responsibilities**:
- Capture and validate user input
- Send queries to backend API
- Display responses with proper formatting
- Handle language switching
- Manage chat history in UI

**Key Functions**:
- `sendMessage()`: Send user query to backend
- `displayMessage()`: Render messages in chat window
- `displayScheme()`: Render scheme cards with details
- `handleVoiceInput()`: Process speech-to-text

#### 3.1.2 Eligibility Checker (app.js)
```
┌─────────────────────────────────────────────────────────┐
│              Eligibility Checker Component               │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Form Manager                                     │  │
│  │  - Field validation                               │  │
│  │  - Dynamic field updates                          │  │
│  │  - Error message display                          │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Profile Data Collector                           │  │
│  │  - Age, Gender, Income                            │  │
│  │  - State, Category, Occupation                    │  │
│  │  - Education, Disability status                   │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Results Display Manager                          │  │
│  │  - Eligible schemes list                          │  │
│  │  - Eligibility reasoning                          │  │
│  │  - Relevance score display                        │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Responsibilities**:
- Collect user profile information
- Validate form inputs
- Submit eligibility check request
- Display personalized recommendations

**Key Functions**:
- `checkEligibility()`: Submit profile to backend
- `displayResults()`: Show eligible schemes
- `validateForm()`: Client-side validation

#### 3.1.3 Admin Panel (admin.js)
```
┌─────────────────────────────────────────────────────────┐
│                  Admin Panel Component                   │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Scheme List Manager                              │  │
│  │  - Fetch and display all schemes                  │  │
│  │  - Search and filter                              │  │
│  │  - Sort by columns                                │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  CRUD Operations Handler                          │  │
│  │  - Add new scheme form                            │  │
│  │  - Edit existing scheme                           │  │
│  │  - Delete with confirmation                       │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Validation & Feedback                            │  │
│  │  - Input validation                               │  │
│  │  - Success/error messages                         │  │
│  │  - Loading states                                 │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Responsibilities**:
- Manage scheme database
- Provide CRUD interface
- Validate admin inputs
- Display operation feedback

**Key Functions**:
- `loadSchemes()`: Fetch all schemes
- `addScheme()`: Create new scheme
- `editScheme()`: Update existing scheme
- `deleteScheme()`: Remove scheme

### 3.2 Backend Components

#### 3.2.1 Flask Application (app.py)
```
┌─────────────────────────────────────────────────────────┐
│                   Flask Application                      │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Route Layer                                      │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌──────────┐  │  │
│  │  │ Chat Routes │  │Admin Routes │  │API Routes│  │  │
│  │  └─────────────┘  └─────────────┘  └──────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Middleware                                       │  │
│  │  - CORS handling                                  │  │
│  │  - Request validation                             │  │
│  │  - Error handling                                 │  │
│  │  - Logging                                        │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Service Integration                              │  │
│  │  - Recommender service                            │  │
│  │  - Eligibility checker                            │  │
│  │  - Translation service                            │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Responsibilities**:
- Handle HTTP requests/responses
- Route requests to appropriate handlers
- Coordinate between services
- Manage database sessions

**Key Routes**:
- `POST /chat`: Process chat queries
- `POST /check-eligibility`: Check user eligibility
- `GET /schemes`: Retrieve all schemes
- `POST /schemes`: Add new scheme
- `PUT /schemes/<id>`: Update scheme
- `DELETE /schemes/<id>`: Delete scheme

#### 3.2.2 Recommender Engine (recommender.py)
```
┌─────────────────────────────────────────────────────────┐
│                  Recommender Engine                      │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Query Processor                                  │  │
│  │  - Text normalization                             │  │
│  │  - Keyword extraction                             │  │
│  │  - Synonym expansion                              │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Matching Engine                                  │  │
│  │  - Keyword matching                               │  │
│  │  - Fuzzy matching                                 │  │
│  │  - Relevance scoring                              │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Result Ranker                                    │  │
│  │  - Score calculation                              │  │
│  │  - Result sorting                                 │  │
│  │  - Top-N selection                                │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Algorithm**:
1. Normalize user query (lowercase, remove punctuation)
2. Extract keywords and expand with synonyms
3. Search schemes by keywords in name, description, keywords field
4. Calculate relevance score based on keyword matches
5. Rank and return top matching schemes

**Synonym Dictionary**:
```python
{
    "farmer": ["agriculture", "krishi", "kisan", "farming"],
    "woman": ["female", "mahila", "women", "lady"],
    "student": ["education", "scholarship", "vidyarthi"],
    "loan": ["credit", "finance", "mudra"],
    "health": ["medical", "healthcare", "swasthya"]
}
```

#### 3.2.3 Eligibility Checker (eligibility_checker.py)
```
┌─────────────────────────────────────────────────────────┐
│                  Eligibility Checker                     │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Profile Validator                                │  │
│  │  - Data type validation                           │  │
│  │  - Range validation                               │  │
│  │  - Required field check                           │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Criteria Matcher                                 │  │
│  │  - Age range check                                │  │
│  │  - Income range check                             │  │
│  │  - Gender match                                   │  │
│  │  - State match                                    │  │
│  │  - Category match                                 │  │
│  │  - Occupation match                               │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Score Calculator                                 │  │
│  │  - Calculate match percentage                     │  │
│  │  - Generate eligibility reason                    │  │
│  │  - Rank schemes by relevance                      │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Matching Logic**:
```python
def calculate_eligibility_score(user_profile, scheme):
    score = 0
    max_score = 0
    
    # Age check (weight: 20)
    if scheme.min_age <= user_profile.age <= scheme.max_age:
        score += 20
    max_score += 20
    
    # Income check (weight: 20)
    if scheme.min_income <= user_profile.income <= scheme.max_income:
        score += 20
    max_score += 20
    
    # Gender match (weight: 15)
    if scheme.gender in ['Any', user_profile.gender]:
        score += 15
    max_score += 15
    
    # State match (weight: 15)
    if user_profile.state in scheme.states:
        score += 15
    max_score += 15
    
    # Category match (weight: 15)
    if user_profile.category in scheme.categories:
        score += 15
    max_score += 15
    
    # Occupation match (weight: 15)
    if user_profile.occupation in scheme.occupations:
        score += 15
    max_score += 15
    
    return (score / max_score) * 100
```

#### 3.2.4 Translation Service (translator.py)
```
┌─────────────────────────────────────────────────────────┐
│                  Translation Service                     │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Language Detector                                │  │
│  │  - Auto-detect source language                    │  │
│  │  - Validate language codes                        │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Translation Engine                               │  │
│  │  - Google Translator API integration             │  │
│  │  - Batch translation support                      │  │
│  │  - Error handling & fallback                      │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Cache Manager (Future)                           │  │
│  │  - Cache frequent translations                    │  │
│  │  - Reduce API calls                               │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Supported Languages**:
- English (en)
- Hindi (hi)
- Kannada (kn)
- Telugu (te)
- Tamil (ta)
- Malayalam (ml)

**Error Handling**:
- API failure → Return original text
- Rate limit → Queue and retry
- Invalid language → Default to English

### 3.3 Database Layer

#### 3.3.1 Models (models.py)
```python
class Scheme(db.Model):
    """
    SQLAlchemy model for government schemes
    """
    # Primary Key
    id = db.Column(db.Integer, primary_key=True)
    
    # Basic Information
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    benefits = db.Column(db.Text, nullable=False)
    how_to_apply = db.Column(db.Text, nullable=False)
    official_link = db.Column(db.String(500))
    keywords = db.Column(db.Text)
    
    # Eligibility Criteria
    min_age = db.Column(db.Integer)
    max_age = db.Column(db.Integer)
    gender = db.Column(db.String(20))
    min_income = db.Column(db.Float)
    max_income = db.Column(db.Float)
    states = db.Column(db.Text)  # Comma-separated
    categories = db.Column(db.Text)  # Comma-separated
    occupations = db.Column(db.Text)  # Comma-separated
    education_level = db.Column(db.String(50))
    disability_required = db.Column(db.Boolean, default=False)
```



---

## 4. Data Architecture

### 4.1 Database Schema Design

#### 4.1.1 Scheme Table Structure

```sql
CREATE TABLE scheme (
    -- Primary Key
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    
    -- Basic Information
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    benefits TEXT NOT NULL,
    how_to_apply TEXT NOT NULL,
    official_link TEXT,
    keywords TEXT,
    
    -- Eligibility Criteria - Numeric
    min_age INTEGER,
    max_age INTEGER,
    min_income REAL,
    max_income REAL,
    
    -- Eligibility Criteria - Categorical
    gender TEXT,                    -- 'Male', 'Female', 'Any'
    states TEXT,                    -- Comma-separated: 'Karnataka,Tamil Nadu'
    categories TEXT,                -- Comma-separated: 'General,OBC,SC,ST'
    occupations TEXT,               -- Comma-separated: 'Farmer,Student,Business'
    education_level TEXT,           -- 'Below 10th', '10th Pass', '12th Pass', 'Graduate'
    disability_required BOOLEAN DEFAULT 0,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 4.1.2 Indexes for Performance

```sql
-- Index on name for quick lookups
CREATE INDEX idx_scheme_name ON scheme(name);

-- Index on keywords for search optimization
CREATE INDEX idx_scheme_keywords ON scheme(keywords);

-- Composite index for eligibility filtering
CREATE INDEX idx_eligibility ON scheme(min_age, max_age, min_income, max_income);
```


#### 4.1.3 Sample Data Structure

```json
{
    "id": 1,
    "name": "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    "description": "Financial support to farmers providing ₹6000 per year in three installments",
    "benefits": "₹2000 every 4 months directly to bank account",
    "how_to_apply": "Register on PM-KISAN portal with Aadhaar and land records",
    "official_link": "https://pmkisan.gov.in/",
    "keywords": "farmer,agriculture,kisan,krishi,financial aid,income support",
    "min_age": 18,
    "max_age": 100,
    "gender": "Any",
    "min_income": 0,
    "max_income": 500000,
    "states": "All States",
    "categories": "General,OBC,SC,ST",
    "occupations": "Farmer",
    "education_level": "Any",
    "disability_required": false
}
```

### 4.2 Data Flow Diagrams

#### 4.2.1 Chat Query Flow

```
User Input → Frontend (chat.js)
    ↓
    [1] User types query: "schemes for farmers"
    [2] Select language: Hindi
    ↓
POST /chat {message: "schemes for farmers", language: "hi"}
    ↓
Backend (app.py) → Route Handler
    ↓
    [3] Extract query and language
    ↓
Recommender Engine (recommender.py)
    ↓
    [4] Normalize query: "schemes for farmers"
    [5] Extract keywords: ["schemes", "farmers"]
    [6] Expand synonyms: ["schemes", "farmers", "agriculture", "kisan"]
    ↓
Database Query (SQLAlchemy)
    ↓
    [7] SELECT * FROM scheme WHERE 
        keywords LIKE '%farmer%' OR 
        keywords LIKE '%agriculture%' OR
        description LIKE '%farmer%'
    ↓
    [8] Return matching schemes (e.g., PM-KISAN, Kisan Credit Card)
    ↓
Translation Service (translator.py)
    ↓
    [9] Translate scheme details to Hindi
    [10] Google Translator API call
    ↓
Response Assembly
    ↓
    [11] Format response with translated schemes
    ↓
JSON Response → Frontend
    ↓
    [12] Display schemes in chat interface
    [13] Show scheme cards with details
```


#### 4.2.2 Eligibility Check Flow

```
User Profile Form → Frontend (app.js)
    ↓
    [1] User fills form:
        - Age: 35
        - Gender: Male
        - Income: 200000
        - State: Karnataka
        - Occupation: Farmer
        - Category: General
    ↓
    [2] Client-side validation
    ↓
POST /check-eligibility {age: 35, gender: "Male", income: 200000, ...}
    ↓
Backend (app.py) → Route Handler
    ↓
    [3] Validate request data
    ↓
Eligibility Checker (eligibility_checker.py)
    ↓
    [4] Fetch all schemes from database
    ↓
Database Query
    ↓
    [5] SELECT * FROM scheme
    ↓
    [6] For each scheme, calculate eligibility score:
        - Age match: 35 in [18-100] ✓ (20 points)
        - Income match: 200000 in [0-500000] ✓ (20 points)
        - Gender match: Male in [Any] ✓ (15 points)
        - State match: Karnataka in [All States] ✓ (15 points)
        - Occupation match: Farmer in [Farmer] ✓ (15 points)
        - Category match: General in [General,OBC,SC,ST] ✓ (15 points)
        Total Score: 100/100 = 100%
    ↓
    [7] Filter schemes with score >= 70%
    [8] Sort by score (descending)
    [9] Generate eligibility reasons
    ↓
Response Assembly
    ↓
    [10] Format eligible schemes with scores and reasons
    ↓
JSON Response → Frontend
    ↓
    [11] Display eligible schemes
    [12] Show eligibility percentage and reasons
```


#### 4.2.3 Admin CRUD Flow

```
Admin Panel → Frontend (admin.js)
    ↓
    [1] Load schemes on page load
    ↓
GET /schemes
    ↓
Backend → Database
    ↓
    [2] SELECT * FROM scheme ORDER BY name
    ↓
    [3] Return all schemes as JSON array
    ↓
Frontend Display
    ↓
    [4] Render schemes in table
    ↓
─────────────────────────────────────────
ADD NEW SCHEME:
    ↓
    [5] Admin fills form with scheme details
    [6] Client-side validation
    ↓
POST /schemes {name, description, eligibility, ...}
    ↓
Backend Validation
    ↓
    [7] Validate required fields
    [8] Sanitize inputs
    ↓
Database Insert
    ↓
    [9] INSERT INTO scheme VALUES (...)
    [10] COMMIT transaction
    ↓
    [11] Return success with new scheme ID
    ↓
Frontend Update
    ↓
    [12] Show success message
    [13] Refresh scheme list
    ↓
─────────────────────────────────────────
EDIT SCHEME:
    ↓
    [14] Admin clicks edit, form pre-filled
    [15] Admin modifies fields
    ↓
PUT /schemes/<id> {updated_fields}
    ↓
Backend Update
    ↓
    [16] UPDATE scheme SET ... WHERE id = <id>
    [17] COMMIT transaction
    ↓
    [18] Return success
    ↓
─────────────────────────────────────────
DELETE SCHEME:
    ↓
    [19] Admin clicks delete
    [20] Confirmation dialog
    ↓
DELETE /schemes/<id>
    ↓
Backend Delete
    ↓
    [21] DELETE FROM scheme WHERE id = <id>
    [22] COMMIT transaction
    ↓
    [23] Return success
```


### 4.3 Data Validation Rules

#### 4.3.1 Input Validation

| Field | Type | Validation Rules |
|-------|------|------------------|
| **name** | String | Required, 5-200 chars, alphanumeric with spaces |
| **description** | Text | Required, 20-2000 chars |
| **benefits** | Text | Required, 10-1000 chars |
| **how_to_apply** | Text | Required, 20-1000 chars |
| **official_link** | URL | Optional, valid URL format |
| **keywords** | String | Optional, comma-separated, max 500 chars |
| **min_age** | Integer | Optional, 0-100, must be < max_age |
| **max_age** | Integer | Optional, 0-120, must be > min_age |
| **gender** | Enum | Optional, ['Male', 'Female', 'Any'] |
| **min_income** | Float | Optional, >= 0, must be < max_income |
| **max_income** | Float | Optional, >= 0, must be > min_income |
| **states** | String | Optional, comma-separated state names |
| **categories** | String | Optional, comma-separated |
| **occupations** | String | Optional, comma-separated |
| **education_level** | String | Optional, predefined values |
| **disability_required** | Boolean | Optional, true/false |

#### 4.3.2 Sanitization

```python
def sanitize_input(data):
    """Sanitize user inputs to prevent injection attacks"""
    sanitized = {}
    for key, value in data.items():
        if isinstance(value, str):
            # Remove HTML tags
            value = re.sub(r'<[^>]+>', '', value)
            # Escape special characters
            value = html.escape(value)
            # Trim whitespace
            value = value.strip()
        sanitized[key] = value
    return sanitized
```



---

## 5. API Design

### 5.1 RESTful API Endpoints

#### 5.1.1 Chat Endpoint

**POST /chat**

Process user query and return matching schemes with translation.

**Request:**
```json
{
    "message": "schemes for farmers in Karnataka",
    "language": "kn"
}
```

**Response (Success - 200 OK):**
```json
{
    "response": "ಕರ್ನಾಟಕದಲ್ಲಿ ರೈತರಿಗೆ ಈ ಯೋಜನೆಗಳು ಲಭ್ಯವಿದೆ:",
    "schemes": [
        {
            "id": 1,
            "name": "ಪಿಎಂ-ಕಿಸಾನ್",
            "description": "ರೈತರಿಗೆ ವರ್ಷಕ್ಕೆ ₹6000 ಆರ್ಥಿಕ ಸಹಾಯ",
            "benefits": "ಪ್ರತಿ 4 ತಿಂಗಳಿಗೊಮ್ಮೆ ₹2000",
            "how_to_apply": "ಪಿಎಂ-ಕಿಸಾನ್ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ನೋಂದಣಿ ಮಾಡಿ",
            "official_link": "https://pmkisan.gov.in/"
        }
    ]
}
```

**Response (No Match - 200 OK):**
```json
{
    "response": "Sorry, no schemes found matching your query. Try different keywords.",
    "schemes": []
}
```

**Response (Error - 500):**
```json
{
    "error": "Translation service unavailable",
    "message": "Please try again later"
}
```

**Validation:**
- `message`: Required, non-empty string, max 500 chars
- `language`: Required, one of ['en', 'hi', 'kn', 'te', 'ta', 'ml']


#### 5.1.2 Eligibility Check Endpoint

**POST /check-eligibility**

Check user eligibility and return personalized recommendations.

**Request:**
```json
{
    "age": 35,
    "gender": "Male",
    "income": 200000,
    "state": "Karnataka",
    "category": "General",
    "occupation": "Farmer",
    "education": "10th Pass",
    "disability": false
}
```

**Response (Success - 200 OK):**
```json
{
    "eligible_schemes": [
        {
            "id": 1,
            "name": "PM-KISAN",
            "description": "Financial support to farmers",
            "eligibility_score": 100,
            "match_reasons": [
                "Age matches (18-100)",
                "Income within range (0-500000)",
                "Occupation matches (Farmer)",
                "State eligible (All States)"
            ],
            "benefits": "₹6000 per year",
            "official_link": "https://pmkisan.gov.in/"
        },
        {
            "id": 5,
            "name": "Kisan Credit Card",
            "eligibility_score": 85,
            "match_reasons": [
                "Age matches (18-65)",
                "Occupation matches (Farmer)"
            ],
            "benefits": "Low-interest agricultural loans",
            "official_link": "https://www.nabard.org/kcc.aspx"
        }
    ],
    "total_eligible": 2
}
```

**Validation:**
- `age`: Required, integer, 18-100
- `gender`: Required, one of ['Male', 'Female', 'Other']
- `income`: Required, float, >= 0
- `state`: Required, valid Indian state name
- `category`: Required, one of ['General', 'OBC', 'SC', 'ST']
- `occupation`: Required, non-empty string
- `education`: Optional, string
- `disability`: Optional, boolean


#### 5.1.3 Get All Schemes

**GET /schemes**

Retrieve all schemes from database.

**Request:** None (GET request)

**Response (Success - 200 OK):**
```json
{
    "schemes": [
        {
            "id": 1,
            "name": "PM-KISAN",
            "description": "Financial support to farmers",
            "benefits": "₹6000 per year",
            "how_to_apply": "Register on PM-KISAN portal",
            "official_link": "https://pmkisan.gov.in/",
            "keywords": "farmer,agriculture,kisan",
            "min_age": 18,
            "max_age": 100,
            "gender": "Any",
            "min_income": 0,
            "max_income": 500000,
            "states": "All States",
            "categories": "General,OBC,SC,ST",
            "occupations": "Farmer",
            "education_level": "Any",
            "disability_required": false
        }
    ],
    "total": 1
}
```

#### 5.1.4 Add New Scheme

**POST /schemes**

Add a new scheme to the database.

**Request:**
```json
{
    "name": "Ayushman Bharat",
    "description": "Health insurance scheme for poor families",
    "benefits": "₹5 lakh health coverage per family per year",
    "how_to_apply": "Visit nearest Ayushman Mitra or CSC",
    "official_link": "https://pmjay.gov.in/",
    "keywords": "health,insurance,medical,ayushman",
    "min_age": 0,
    "max_age": 100,
    "gender": "Any",
    "min_income": 0,
    "max_income": 100000,
    "states": "All States",
    "categories": "General,OBC,SC,ST",
    "occupations": "Any",
    "education_level": "Any",
    "disability_required": false
}
```

**Response (Success - 201 Created):**
```json
{
    "success": true,
    "message": "Scheme added successfully",
    "scheme_id": 15
}
```

**Response (Validation Error - 400):**
```json
{
    "success": false,
    "error": "Validation failed",
    "details": {
        "name": "Name is required",
        "min_age": "Must be less than max_age"
    }
}
```


#### 5.1.5 Update Scheme

**PUT /schemes/<id>**

Update an existing scheme.

**Request:**
```json
{
    "name": "PM-KISAN (Updated)",
    "description": "Updated description",
    "max_income": 600000
}
```

**Response (Success - 200 OK):**
```json
{
    "success": true,
    "message": "Scheme updated successfully"
}
```

**Response (Not Found - 404):**
```json
{
    "success": false,
    "error": "Scheme not found"
}
```

#### 5.1.6 Delete Scheme

**DELETE /schemes/<id>**

Delete a scheme from database.

**Request:** None (DELETE request with ID in URL)

**Response (Success - 200 OK):**
```json
{
    "success": true,
    "message": "Scheme deleted successfully"
}
```

**Response (Not Found - 404):**
```json
{
    "success": false,
    "error": "Scheme not found"
}
```

### 5.2 Error Handling Strategy

#### 5.2.1 HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST (resource created) |
| 400 | Bad Request | Validation errors, malformed request |
| 404 | Not Found | Resource doesn't exist |
| 500 | Internal Server Error | Server-side errors, database issues |
| 503 | Service Unavailable | External API failures (translation) |

#### 5.2.2 Error Response Format

```json
{
    "success": false,
    "error": "Error type",
    "message": "Human-readable error message",
    "details": {
        "field": "Specific validation error"
    },
    "timestamp": "2026-02-14T10:30:00Z"
}
```


---

## 6. Security Architecture

### 6.1 Security Layers

```
┌─────────────────────────────────────────────────────────┐
│                    Security Layers                       │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Layer 1: Transport Security                      │  │
│  │  - HTTPS/TLS encryption                           │  │
│  │  - Secure headers (HSTS, CSP)                     │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Layer 2: Input Validation                        │  │
│  │  - Client-side validation (JavaScript)            │  │
│  │  - Server-side validation (Flask)                 │  │
│  │  - Type checking and sanitization                 │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Layer 3: Injection Prevention                    │  │
│  │  - SQL injection (SQLAlchemy ORM)                 │  │
│  │  - XSS prevention (HTML escaping)                 │  │
│  │  - CSRF protection (future)                       │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Layer 4: Authentication (Future)                 │  │
│  │  - Admin panel authentication                     │  │
│  │  - JWT tokens                                     │  │
│  │  - Role-based access control                      │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Layer 5: Data Protection                         │  │
│  │  - No persistent user data storage                │  │
│  │  - Environment variables for secrets              │  │
│  │  - API key protection                             │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 6.2 Security Measures

#### 6.2.1 Input Validation & Sanitization

```python
# Server-side validation example
def validate_scheme_data(data):
    errors = {}
    
    # Required fields
    if not data.get('name') or len(data['name']) < 5:
        errors['name'] = 'Name must be at least 5 characters'
    
    # Age validation
    if data.get('min_age') and data.get('max_age'):
        if data['min_age'] >= data['max_age']:
            errors['age'] = 'Min age must be less than max age'
    
    # Income validation
    if data.get('min_income', 0) < 0:
        errors['income'] = 'Income cannot be negative'
    
    # URL validation
    if data.get('official_link'):
        if not is_valid_url(data['official_link']):
            errors['url'] = 'Invalid URL format'
    
    return errors
```


#### 6.2.2 SQL Injection Prevention

```python
# SAFE: Using SQLAlchemy ORM (parameterized queries)
schemes = Scheme.query.filter(
    Scheme.name.like(f'%{search_term}%')
).all()

# UNSAFE: Raw SQL with string concatenation (NEVER DO THIS)
# query = f"SELECT * FROM scheme WHERE name LIKE '%{search_term}%'"
```

#### 6.2.3 XSS Prevention

```javascript
// Frontend: Escape HTML before displaying user input
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Display user message safely
messageDiv.textContent = userMessage; // Uses textContent, not innerHTML
```

```python
# Backend: Sanitize inputs
import html

def sanitize_text(text):
    # Remove HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    # Escape special characters
    text = html.escape(text)
    return text.strip()
```

#### 6.2.4 CORS Configuration

```python
from flask_cors import CORS

# Configure CORS for production
CORS(app, resources={
    r"/api/*": {
        "origins": ["https://jansahay.com"],
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type"]
    }
})
```

#### 6.2.5 Environment Variables

```python
# Store sensitive data in environment variables
import os

# Development
TRANSLATOR_API_KEY = os.getenv('TRANSLATOR_API_KEY', 'default-dev-key')
DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///jansahay.db')
SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')

# Production (set in hosting platform)
# TRANSLATOR_API_KEY=prod-key-xyz
# DATABASE_URL=postgresql://user:pass@host/db
# SECRET_KEY=random-secure-key
```

### 6.3 Privacy Considerations

#### 6.3.1 Data Minimization
- User profile data collected only for eligibility checking
- No data stored in database (session-based only)
- No tracking or analytics in MVP

#### 6.3.2 Data Retention
- User inputs cleared on browser session end
- No cookies or persistent storage
- Chat history stored only in browser memory

#### 6.3.3 Future Authentication (Admin Panel)

```python
# JWT-based authentication (future implementation)
from flask_jwt_extended import JWTManager, create_access_token

@app.route('/admin/login', methods=['POST'])
def admin_login():
    username = request.json.get('username')
    password = request.json.get('password')
    
    # Verify credentials (hash comparison)
    if verify_admin_credentials(username, password):
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200
    
    return jsonify(error='Invalid credentials'), 401

@app.route('/schemes', methods=['POST'])
@jwt_required()
def add_scheme():
    # Only authenticated admins can add schemes
    pass
```


---

## 7. Deployment Architecture

### 7.1 Deployment Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         INTERNET                                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                    HTTPS (443)
                         │
┌────────────────────────▼────────────────────────────────────────┐
│                    LOAD BALANCER / CDN                           │
│                  (Cloudflare / AWS CloudFront)                   │
│  - SSL/TLS Termination                                           │
│  - DDoS Protection                                               │
│  - Static Asset Caching                                          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │
┌────────────────────────▼────────────────────────────────────────┐
│                   HOSTING PLATFORM                               │
│                  (Heroku / AWS / Render)                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Web Server (Gunicorn)                       │   │
│  │  - Process Management                                    │   │
│  │  - Worker Processes (2-4)                                │   │
│  │  - Request Handling                                      │   │
│  └────────────────────┬─────────────────────────────────────┘   │
│                       │                                          │
│  ┌────────────────────▼─────────────────────────────────────┐   │
│  │           Flask Application                              │   │
│  │  - API Endpoints                                         │   │
│  │  - Business Logic                                        │   │
│  │  - Static File Serving                                   │   │
│  └────────────────────┬─────────────────────────────────────┘   │
│                       │                                          │
│  ┌────────────────────▼─────────────────────────────────────┐   │
│  │           Database (PostgreSQL)                          │   │
│  │  - Scheme data storage                                   │   │
│  │  - Connection pooling                                    │   │
│  │  - Automated backups                                     │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                         │
                         │ API Calls
                         │
┌────────────────────────▼────────────────────────────────────────┐
│                  EXTERNAL SERVICES                               │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │         Google Translator API                            │   │
│  │  - Translation requests                                  │   │
│  │  - Rate limiting                                         │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 7.2 Deployment Configurations

#### 7.2.1 Heroku Deployment

**Procfile:**
```
web: gunicorn app:app --bind 0.0.0.0:$PORT --workers 3 --timeout 120
```

**runtime.txt:**
```
python-3.10.12
```

**Environment Variables:**
```bash
DATABASE_URL=postgresql://user:pass@host:5432/jansahay
SECRET_KEY=your-secret-key-here
TRANSLATOR_API_KEY=your-translator-api-key
FLASK_ENV=production
```

**Deployment Commands:**
```bash
# Initialize Heroku app
heroku create jansahay-ai

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:mini

# Set environment variables
heroku config:set SECRET_KEY=random-key
heroku config:set TRANSLATOR_API_KEY=api-key

# Deploy
git push heroku main

# Initialize database
heroku run python -c "from app import db; db.create_all()"

# View logs
heroku logs --tail
```


#### 7.2.2 AWS Deployment

**Architecture:**
```
Route 53 (DNS) → CloudFront (CDN) → ALB (Load Balancer)
    → EC2 / ECS (Application) → RDS (PostgreSQL)
```

**Services Used:**
- **EC2/ECS**: Application hosting
- **RDS PostgreSQL**: Database
- **S3**: Static file storage
- **CloudFront**: CDN for static assets
- **Route 53**: DNS management
- **CloudWatch**: Monitoring and logging

**Deployment Steps:**
1. Create RDS PostgreSQL instance
2. Launch EC2 instance or ECS cluster
3. Configure security groups (allow 443, 80)
4. Deploy application code
5. Set up CloudFront distribution
6. Configure Route 53 DNS records

#### 7.2.3 Docker Deployment (Optional)

**Dockerfile:**
```dockerfile
FROM python:3.10-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 5000

# Run application
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:5000", "--workers", "3"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/jansahay
      - SECRET_KEY=dev-secret-key
    depends_on:
      - db
  
  db:
    image: postgres:14
    environment:
      - POSTGRES_DB=jansahay
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### 7.3 Monitoring & Logging

#### 7.3.1 Application Logging

```python
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)

# Log important events
@app.route('/chat', methods=['POST'])
def chat():
    logger.info(f"Chat request received: {request.json.get('message')}")
    try:
        # Process request
        logger.info("Chat response sent successfully")
    except Exception as e:
        logger.error(f"Chat error: {str(e)}", exc_info=True)
```

#### 7.3.2 Monitoring Metrics

| Metric | Tool | Threshold |
|--------|------|-----------|
| Response Time | New Relic / DataDog | < 2s (95th percentile) |
| Error Rate | CloudWatch / Sentry | < 1% |
| Database Connections | PostgreSQL Stats | < 80% of max |
| Memory Usage | System Metrics | < 80% |
| CPU Usage | System Metrics | < 70% |
| API Call Success Rate | Custom Logs | > 99% |

#### 7.3.3 Health Check Endpoint

```python
@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint for load balancer"""
    try:
        # Check database connection
        db.session.execute('SELECT 1')
        
        return jsonify({
            'status': 'healthy',
            'database': 'connected',
            'timestamp': datetime.utcnow().isoformat()
        }), 200
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'error': str(e)
        }), 503
```


---

## 8. Scalability Strategy

### 8.1 Horizontal Scaling Architecture

```
                    ┌─────────────────┐
                    │  Load Balancer  │
                    └────────┬────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
    ┌───────▼──────┐  ┌─────▼──────┐  ┌─────▼──────┐
    │  App Server  │  │ App Server │  │ App Server │
    │  Instance 1  │  │ Instance 2 │  │ Instance 3 │
    └───────┬──────┘  └─────┬──────┘  └─────┬──────┘
            │                │                │
            └────────────────┼────────────────┘
                             │
                    ┌────────▼────────┐
                    │   Database      │
                    │  (PostgreSQL)   │
                    │  + Read Replica │
                    └─────────────────┘
```

### 8.2 Scalability Strategies

#### 8.2.1 Application Layer Scaling

**Stateless Design:**
- No session data stored on server
- All state maintained in client or database
- Enables easy horizontal scaling

**Load Balancing:**
- Round-robin distribution
- Health check-based routing
- Sticky sessions not required

**Auto-scaling Rules:**
```yaml
# Example: AWS Auto Scaling Configuration
min_instances: 2
max_instances: 10
target_cpu_utilization: 70%
scale_up_threshold: 80%
scale_down_threshold: 30%
cooldown_period: 300s
```

#### 8.2.2 Database Scaling

**Read Replicas:**
```python
# Master-slave configuration
SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')  # Write operations
SQLALCHEMY_BINDS = {
    'read_replica': os.getenv('READ_REPLICA_URL')  # Read operations
}

# Use read replica for queries
schemes = Scheme.query.options(
    db.load_only('name', 'description')
).with_session(db.get_engine(bind='read_replica')).all()
```

**Connection Pooling:**
```python
# SQLAlchemy connection pool configuration
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    'pool_size': 10,
    'pool_recycle': 3600,
    'pool_pre_ping': True,
    'max_overflow': 20
}
```

**Database Indexing:**
```sql
-- Optimize frequent queries
CREATE INDEX idx_scheme_keywords ON scheme(keywords);
CREATE INDEX idx_scheme_name ON scheme(name);
CREATE INDEX idx_eligibility ON scheme(min_age, max_age, min_income, max_income);

-- Full-text search index (PostgreSQL)
CREATE INDEX idx_scheme_fulltext ON scheme 
USING gin(to_tsvector('english', name || ' ' || description || ' ' || keywords));
```


#### 8.2.3 Caching Strategy

**Multi-Level Caching:**

```
┌─────────────────────────────────────────────────────────┐
│                    Caching Layers                        │
│  ┌───────────────────────────────────────────────────┐  │
│  │  L1: Browser Cache (Static Assets)                │  │
│  │  - CSS, JS, Images                                │  │
│  │  - Cache-Control: max-age=86400                   │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  L2: CDN Cache (CloudFront/Cloudflare)            │  │
│  │  - Static files                                   │  │
│  │  - Frequently accessed API responses              │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  L3: Application Cache (Redis)                    │  │
│  │  - Scheme data (TTL: 1 hour)                      │  │
│  │  - Translation cache (TTL: 24 hours)              │  │
│  │  - Query results (TTL: 15 minutes)                │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  L4: Database Query Cache                         │  │
│  │  - PostgreSQL query cache                         │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Redis Caching Implementation:**

```python
import redis
import json

# Initialize Redis
redis_client = redis.Redis(
    host=os.getenv('REDIS_HOST', 'localhost'),
    port=6379,
    decode_responses=True
)

def get_cached_schemes():
    """Get schemes from cache or database"""
    cache_key = 'all_schemes'
    
    # Try cache first
    cached = redis_client.get(cache_key)
    if cached:
        return json.loads(cached)
    
    # Cache miss - fetch from database
    schemes = Scheme.query.all()
    scheme_list = [s.to_dict() for s in schemes]
    
    # Store in cache (1 hour TTL)
    redis_client.setex(
        cache_key,
        3600,
        json.dumps(scheme_list)
    )
    
    return scheme_list

def invalidate_scheme_cache():
    """Invalidate cache when schemes are modified"""
    redis_client.delete('all_schemes')
```

**Translation Caching:**

```python
def translate_with_cache(text, target_lang):
    """Translate with caching to reduce API calls"""
    cache_key = f'translation:{target_lang}:{hash(text)}'
    
    # Check cache
    cached = redis_client.get(cache_key)
    if cached:
        return cached
    
    # Translate via API
    translated = translator.translate(text, dest=target_lang).text
    
    # Cache for 24 hours
    redis_client.setex(cache_key, 86400, translated)
    
    return translated
```

#### 8.2.4 API Rate Limiting

```python
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

@app.route('/chat', methods=['POST'])
@limiter.limit("30 per minute")
def chat():
    """Rate-limited chat endpoint"""
    pass

@app.route('/check-eligibility', methods=['POST'])
@limiter.limit("20 per minute")
def check_eligibility():
    """Rate-limited eligibility check"""
    pass
```

### 8.3 Performance Optimization

#### 8.3.1 Database Query Optimization

```python
# BAD: N+1 query problem
schemes = Scheme.query.all()
for scheme in schemes:
    print(scheme.name)  # Each access hits database

# GOOD: Eager loading
schemes = Scheme.query.options(
    db.load_only('id', 'name', 'description')
).all()

# GOOD: Pagination for large datasets
schemes = Scheme.query.paginate(
    page=1,
    per_page=20,
    error_out=False
)
```

#### 8.3.2 Frontend Optimization

```javascript
// Debounce search input
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Debounced search (wait 300ms after user stops typing)
const debouncedSearch = debounce(searchSchemes, 300);
searchInput.addEventListener('input', debouncedSearch);
```

```html
<!-- Lazy load images -->
<img src="placeholder.jpg" data-src="actual-image.jpg" loading="lazy">

<!-- Defer non-critical JavaScript -->
<script src="analytics.js" defer></script>

<!-- Preload critical resources -->
<link rel="preload" href="main.css" as="style">
```


#### 8.3.3 Asynchronous Processing (Future)

```python
from celery import Celery

# Initialize Celery for background tasks
celery = Celery('jansahay', broker='redis://localhost:6379/0')

@celery.task
def batch_translate_schemes(scheme_ids, target_lang):
    """Translate multiple schemes in background"""
    schemes = Scheme.query.filter(Scheme.id.in_(scheme_ids)).all()
    
    for scheme in schemes:
        translated = translate_scheme(scheme, target_lang)
        cache_translation(scheme.id, target_lang, translated)
    
    return f"Translated {len(schemes)} schemes"

# Usage
@app.route('/admin/translate-all', methods=['POST'])
def translate_all_schemes():
    scheme_ids = [s.id for s in Scheme.query.all()]
    target_lang = request.json.get('language')
    
    # Queue background task
    task = batch_translate_schemes.delay(scheme_ids, target_lang)
    
    return jsonify({
        'task_id': task.id,
        'status': 'processing'
    })
```

### 8.4 Capacity Planning

#### 8.4.1 Resource Estimates

**Current MVP (100 concurrent users):**
- **Server**: 1 instance, 512MB RAM, 1 vCPU
- **Database**: PostgreSQL, 10GB storage
- **Bandwidth**: ~50GB/month

**Scale Target (1,000 concurrent users):**
- **Server**: 3-5 instances, 2GB RAM each, 2 vCPU
- **Database**: PostgreSQL with read replica, 50GB storage
- **Cache**: Redis, 1GB RAM
- **Bandwidth**: ~500GB/month

**Scale Target (10,000 concurrent users):**
- **Server**: 10-20 instances (auto-scaling)
- **Database**: PostgreSQL cluster with multiple read replicas
- **Cache**: Redis cluster, 10GB RAM
- **CDN**: CloudFront for static assets
- **Bandwidth**: ~5TB/month

#### 8.4.2 Cost Estimates (Monthly)

| Scale | Users | Infrastructure | External APIs | Total |
|-------|-------|----------------|---------------|-------|
| MVP | 100 | $10 (Heroku Hobby) | $5 (Translation) | $15 |
| Small | 1,000 | $50 (Heroku Standard) | $20 | $70 |
| Medium | 10,000 | $300 (AWS/GCP) | $100 | $400 |
| Large | 100,000 | $2,000+ | $500+ | $2,500+ |



---

## 9. Future Enhancements

### 9.1 Advanced AI/ML Features

#### 9.1.1 Natural Language Understanding

**Current**: Keyword matching with synonym expansion
**Future**: Advanced NLP using transformers

```python
# Integration with Hugging Face transformers
from transformers import pipeline

# Intent classification
classifier = pipeline("zero-shot-classification")
result = classifier(
    "I need help with farming loans",
    candidate_labels=["agriculture", "education", "health", "business"]
)
# Result: agriculture (high confidence)

# Named Entity Recognition
ner = pipeline("ner")
entities = ner("I am a 35-year-old farmer from Karnataka")
# Extract: age=35, occupation=farmer, location=Karnataka
```

#### 9.1.2 Personalized Recommendations

```python
# Collaborative filtering based on user interactions
class RecommendationEngine:
    def __init__(self):
        self.user_interactions = {}  # user_id -> [scheme_ids]
    
    def recommend_similar_schemes(self, user_profile):
        """Recommend schemes based on similar user profiles"""
        # Find users with similar profiles
        similar_users = self.find_similar_users(user_profile)
        
        # Get schemes they accessed
        recommended_schemes = self.aggregate_schemes(similar_users)
        
        # Rank by popularity and relevance
        return self.rank_recommendations(recommended_schemes)
```

#### 9.1.3 Chatbot with Context Memory

```python
# Conversational AI with context tracking
class ConversationalAgent:
    def __init__(self):
        self.conversation_history = {}
    
    def process_message(self, user_id, message):
        # Retrieve conversation context
        context = self.conversation_history.get(user_id, [])
        
        # Understand intent with context
        intent = self.classify_intent(message, context)
        
        # Generate contextual response
        response = self.generate_response(intent, context)
        
        # Update conversation history
        context.append({'user': message, 'bot': response})
        self.conversation_history[user_id] = context[-5:]  # Keep last 5 turns
        
        return response
```

### 9.2 Mobile Application

#### 9.2.1 React Native Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  Mobile App (React Native)               │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Screens                                          │  │
│  │  - Home / Chat                                    │  │
│  │  - Eligibility Checker                            │  │
│  │  - Scheme Details                                 │  │
│  │  - Profile Management                             │  │
│  │  - Notifications                                  │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Features                                         │  │
│  │  - Offline mode (cached schemes)                  │  │
│  │  - Push notifications                             │  │
│  │  - Biometric authentication                       │  │
│  │  - Share schemes via WhatsApp/SMS                 │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                         │
                    REST API
                         │
┌────────────────────────▼────────────────────────────────┐
│              Existing Backend (Flask)                    │
└─────────────────────────────────────────────────────────┘
```

### 9.3 Integration with Government Portals

#### 9.3.1 Single Sign-On (SSO)

```python
# Integration with DigiLocker / Aadhaar
@app.route('/auth/digilocker', methods=['POST'])
def digilocker_auth():
    """Authenticate user via DigiLocker"""
    auth_code = request.json.get('code')
    
    # Exchange code for access token
    token = exchange_digilocker_code(auth_code)
    
    # Fetch user profile
    profile = fetch_digilocker_profile(token)
    
    # Auto-fill eligibility form
    return jsonify({
        'name': profile['name'],
        'age': calculate_age(profile['dob']),
        'state': profile['address']['state']
    })
```

#### 9.3.2 Application Submission

```python
# Direct application submission to government portals
@app.route('/apply/<scheme_id>', methods=['POST'])
def apply_to_scheme(scheme_id):
    """Submit application to government portal"""
    scheme = Scheme.query.get(scheme_id)
    user_data = request.json
    
    # Format data according to portal requirements
    application_data = format_application(scheme, user_data)
    
    # Submit to government API
    response = submit_to_government_portal(
        scheme.portal_api_url,
        application_data
    )
    
    return jsonify({
        'application_id': response['id'],
        'status': 'submitted',
        'tracking_url': response['tracking_url']
    })
```


### 9.4 Analytics & Insights Dashboard

#### 9.4.1 Admin Analytics

```python
# Analytics endpoints for admin dashboard
@app.route('/admin/analytics/overview', methods=['GET'])
def analytics_overview():
    """Get platform usage statistics"""
    return jsonify({
        'total_queries': get_total_queries(),
        'unique_users': get_unique_users(),
        'popular_schemes': get_popular_schemes(limit=10),
        'language_distribution': get_language_stats(),
        'eligibility_checks': get_eligibility_check_count(),
        'conversion_rate': calculate_conversion_rate()
    })

@app.route('/admin/analytics/schemes/<scheme_id>', methods=['GET'])
def scheme_analytics(scheme_id):
    """Get analytics for specific scheme"""
    return jsonify({
        'views': get_scheme_views(scheme_id),
        'applications': get_application_count(scheme_id),
        'eligibility_matches': get_match_count(scheme_id),
        'user_demographics': get_user_demographics(scheme_id)
    })
```

#### 9.4.2 Visualization Dashboard

```javascript
// Frontend analytics dashboard using Chart.js
const analyticsData = await fetch('/admin/analytics/overview');

// User growth chart
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
            label: 'Active Users',
            data: [120, 250, 380, 520, 680]
        }]
    }
});

// Popular schemes pie chart
new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: ['PM-KISAN', 'Ayushman Bharat', 'PMAY'],
        datasets: [{
            data: [45, 30, 25]
        }]
    }
});
```

### 9.5 WhatsApp / SMS Integration

#### 9.5.1 WhatsApp Bot Architecture

```
User → WhatsApp → Twilio API → Webhook → Flask Backend
    ← WhatsApp ← Twilio API ← Response ← Flask Backend
```

```python
from twilio.rest import Client

@app.route('/webhook/whatsapp', methods=['POST'])
def whatsapp_webhook():
    """Handle incoming WhatsApp messages"""
    incoming_msg = request.values.get('Body', '').strip()
    from_number = request.values.get('From', '')
    
    # Process message through recommender
    response = process_chat_query(incoming_msg, language='hi')
    
    # Send response via Twilio
    client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    message = client.messages.create(
        body=response,
        from_='whatsapp:+14155238886',
        to=from_number
    )
    
    return '', 200
```

#### 9.5.2 SMS Notifications

```python
def send_scheme_notification(phone_number, scheme):
    """Send SMS notification about new scheme"""
    message = f"""
    New Scheme Alert!
    {scheme.name}
    
    Benefits: {scheme.benefits[:100]}...
    
    Check eligibility: https://jansahay.ai/check/{scheme.id}
    """
    
    client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    client.messages.create(
        body=message,
        from_=TWILIO_PHONE_NUMBER,
        to=phone_number
    )
```

### 9.6 Voice Assistant Integration

#### 9.6.1 Alexa Skill

```python
from flask_ask import Ask, statement, question

ask = Ask(app, '/alexa')

@ask.intent('SchemeSearchIntent', mapping={'query': 'Query'})
def search_schemes(query):
    """Alexa skill for scheme search"""
    schemes = recommender.find_schemes(query)
    
    if schemes:
        response = f"I found {len(schemes)} schemes. "
        response += f"The top match is {schemes[0].name}. "
        response += f"{schemes[0].description}"
        return statement(response)
    else:
        return statement("Sorry, I couldn't find any matching schemes.")

@ask.intent('EligibilityCheckIntent')
def check_eligibility_voice():
    """Start eligibility check via voice"""
    return question("Sure! Let's check your eligibility. What is your age?")
```

#### 9.6.2 Google Assistant Action

```javascript
// Dialogflow webhook for Google Assistant
app.post('/webhook/google-assistant', (req, res) => {
    const intent = req.body.queryResult.intent.displayName;
    
    if (intent === 'SearchSchemes') {
        const query = req.body.queryResult.parameters.query;
        const schemes = findSchemes(query);
        
        res.json({
            fulfillmentText: `I found ${schemes.length} schemes for you.`,
            fulfillmentMessages: [
                {
                    card: {
                        title: schemes[0].name,
                        subtitle: schemes[0].description,
                        buttons: [{
                            text: 'Learn More',
                            postback: schemes[0].official_link
                        }]
                    }
                }
            ]
        });
    }
});
```


### 9.7 Blockchain for Transparency

#### 9.7.1 Application Tracking on Blockchain

```python
from web3 import Web3

# Smart contract for application tracking
class ApplicationTracker:
    def __init__(self, contract_address):
        self.w3 = Web3(Web3.HTTPProvider('https://polygon-rpc.com'))
        self.contract = self.w3.eth.contract(
            address=contract_address,
            abi=APPLICATION_TRACKER_ABI
        )
    
    def record_application(self, user_id, scheme_id, application_data):
        """Record application on blockchain for transparency"""
        tx_hash = self.contract.functions.recordApplication(
            user_id,
            scheme_id,
            application_data
        ).transact()
        
        # Wait for transaction confirmation
        receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
        
        return {
            'transaction_hash': tx_hash.hex(),
            'block_number': receipt['blockNumber'],
            'status': 'confirmed'
        }
    
    def track_application(self, application_id):
        """Track application status on blockchain"""
        status = self.contract.functions.getApplicationStatus(
            application_id
        ).call()
        
        return {
            'status': status['status'],
            'timestamp': status['timestamp'],
            'verifiable_url': f'https://polygonscan.com/tx/{status["tx_hash"]}'
        }
```

### 9.8 Microservices Architecture (Future Scale)

```
┌─────────────────────────────────────────────────────────────────┐
│                        API Gateway                               │
│                  (Kong / AWS API Gateway)                        │
└────────┬────────────────┬────────────────┬────────────────┬─────┘
         │                │                │                │
    ┌────▼────┐      ┌────▼────┐     ┌────▼────┐     ┌────▼────┐
    │  Chat   │      │Eligibility│    │  Admin  │     │Analytics│
    │ Service │      │  Service  │    │ Service │     │ Service │
    └────┬────┘      └────┬─────┘     └────┬────┘     └────┬────┘
         │                │                │                │
         └────────────────┼────────────────┼────────────────┘
                          │                │
                     ┌────▼────┐      ┌────▼────┐
                     │Recommender│    │Translation│
                     │  Service  │    │  Service  │
                     └────┬──────┘    └────┬──────┘
                          │                │
                     ┌────▼────────────────▼────┐
                     │    Message Queue (RabbitMQ)│
                     └────┬────────────────┬─────┘
                          │                │
                     ┌────▼────┐      ┌────▼────┐
                     │PostgreSQL│     │  Redis  │
                     │ Database │     │  Cache  │
                     └──────────┘     └─────────┘
```

**Benefits of Microservices:**
- Independent scaling of services
- Technology diversity (different languages per service)
- Fault isolation
- Easier maintenance and updates
- Team autonomy

### 9.9 Progressive Web App (PWA)

```javascript
// Service Worker for offline functionality
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('jansahay-v1').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles/main.css',
                '/scripts/app.js',
                '/scripts/chat.js',
                '/offline.html'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return cached version or fetch from network
            return response || fetch(event.request);
        }).catch(() => {
            // Show offline page if both fail
            return caches.match('/offline.html');
        })
    );
});
```

**PWA Manifest:**
```json
{
    "name": "JanSahay AI",
    "short_name": "JanSahay",
    "description": "AI-powered government scheme recommendations",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#4CAF50",
    "icons": [
        {
            "src": "/icons/icon-192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/icons/icon-512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ]
}
```



---

## 10. Testing Strategy

### 10.1 Testing Pyramid

```
                    ┌─────────────┐
                    │   E2E Tests │  (10%)
                    │  Selenium   │
                    └─────────────┘
                ┌───────────────────┐
                │ Integration Tests │  (30%)
                │   API Testing     │
                └───────────────────┘
            ┌───────────────────────────┐
            │      Unit Tests           │  (60%)
            │  pytest, unittest         │
            └───────────────────────────┘
```

### 10.2 Unit Testing

```python
# tests/test_recommender.py
import pytest
from utils.recommender import Recommender

def test_keyword_extraction():
    recommender = Recommender()
    keywords = recommender.extract_keywords("schemes for farmers")
    assert "farmer" in keywords or "agriculture" in keywords

def test_synonym_expansion():
    recommender = Recommender()
    expanded = recommender.expand_synonyms(["farmer"])
    assert "agriculture" in expanded
    assert "kisan" in expanded

def test_scheme_matching():
    recommender = Recommender()
    schemes = recommender.find_schemes("farmer loan")
    assert len(schemes) > 0
    assert any("kisan" in s.name.lower() for s in schemes)
```

```python
# tests/test_eligibility_checker.py
def test_age_eligibility():
    checker = EligibilityChecker()
    profile = {"age": 35}
    scheme = Scheme(min_age=18, max_age=60)
    
    assert checker.check_age_eligibility(profile, scheme) == True

def test_income_eligibility():
    checker = EligibilityChecker()
    profile = {"income": 200000}
    scheme = Scheme(min_income=0, max_income=500000)
    
    assert checker.check_income_eligibility(profile, scheme) == True

def test_eligibility_score_calculation():
    checker = EligibilityChecker()
    profile = {
        "age": 35,
        "income": 200000,
        "gender": "Male",
        "state": "Karnataka"
    }
    scheme = create_test_scheme()
    
    score = checker.calculate_score(profile, scheme)
    assert 0 <= score <= 100
```

### 10.3 Integration Testing

```python
# tests/test_api.py
import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_chat_endpoint(client):
    response = client.post('/chat', json={
        'message': 'schemes for farmers',
        'language': 'en'
    })
    assert response.status_code == 200
    data = response.get_json()
    assert 'response' in data
    assert 'schemes' in data

def test_eligibility_check(client):
    response = client.post('/check-eligibility', json={
        'age': 35,
        'gender': 'Male',
        'income': 200000,
        'state': 'Karnataka',
        'category': 'General',
        'occupation': 'Farmer'
    })
    assert response.status_code == 200
    data = response.get_json()
    assert 'eligible_schemes' in data

def test_add_scheme(client):
    response = client.post('/schemes', json={
        'name': 'Test Scheme',
        'description': 'Test description',
        'benefits': 'Test benefits',
        'how_to_apply': 'Test application process'
    })
    assert response.status_code == 201
    data = response.get_json()
    assert data['success'] == True
```

### 10.4 End-to-End Testing

```python
# tests/test_e2e.py
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait

def test_chat_flow():
    driver = webdriver.Chrome()
    driver.get('http://localhost:5000')
    
    # Find chat input
    chat_input = driver.find_element(By.ID, 'user-input')
    chat_input.send_keys('schemes for farmers')
    
    # Click send button
    send_button = driver.find_element(By.ID, 'send-btn')
    send_button.click()
    
    # Wait for response
    WebDriverWait(driver, 10).until(
        lambda d: d.find_element(By.CLASS_NAME, 'bot-message')
    )
    
    # Verify response
    bot_message = driver.find_element(By.CLASS_NAME, 'bot-message')
    assert 'PM-KISAN' in bot_message.text or 'scheme' in bot_message.text.lower()
    
    driver.quit()
```

---

## 11. Conclusion

### 11.1 Design Summary

JanSahay AI is architected as a scalable, maintainable three-tier web application that democratizes access to government welfare schemes through AI-powered recommendations and multilingual support.

**Key Design Decisions:**
- **Three-tier architecture** for clear separation of concerns
- **RESTful API** for frontend-backend communication
- **SQLAlchemy ORM** for database abstraction and security
- **Stateless design** enabling horizontal scalability
- **Modular components** for easy maintenance and testing
- **Multi-level caching** for performance optimization
- **Security-first approach** with input validation and sanitization

### 11.2 Technical Highlights

✅ **Scalability**: Horizontal scaling with load balancing and caching
✅ **Performance**: Sub-2-second response times with optimization strategies
✅ **Security**: Multiple layers of protection against common vulnerabilities
✅ **Accessibility**: Multi-language support and mobile-responsive design
✅ **Maintainability**: Clean code structure with comprehensive documentation
✅ **Extensibility**: Modular architecture supporting future enhancements

### 11.3 Future Roadmap

**Phase 1 (Current)**: MVP with core features
**Phase 2 (3-6 months)**: Advanced NLP, mobile app, authentication
**Phase 3 (6-12 months)**: Government integration, analytics, WhatsApp bot
**Phase 4 (12+ months)**: Microservices, blockchain, voice assistants

---

**Document Status**: Complete and Ready for Implementation
**Last Updated**: February 14, 2026
**Next Review**: Post-MVP Launch

---

## Appendix

### A. Glossary

- **API**: Application Programming Interface
- **CDN**: Content Delivery Network
- **CORS**: Cross-Origin Resource Sharing
- **CRUD**: Create, Read, Update, Delete
- **JWT**: JSON Web Token
- **NLP**: Natural Language Processing
- **ORM**: Object-Relational Mapping
- **PWA**: Progressive Web App
- **REST**: Representational State Transfer
- **SSO**: Single Sign-On
- **TTL**: Time To Live

### B. References

- Flask Documentation: https://flask.palletsprojects.com/
- SQLAlchemy Documentation: https://docs.sqlalchemy.org/
- PostgreSQL Documentation: https://www.postgresql.org/docs/
- Heroku Deployment Guide: https://devcenter.heroku.com/
- Web Speech API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
- Google Translator API: https://cloud.google.com/translate/docs

### C. Contact & Support

For technical questions or clarifications about this design document, contact the development team.

---

**End of Design Document**
