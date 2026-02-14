# JanSahay AI – AI Powered Scheme Recommendation Platform
## Project Requirements Document

---

## 1. Problem Statement

Millions of Indian citizens remain unaware of government welfare schemes they are eligible for due to:
- Complex eligibility criteria written in technical language
- Language barriers preventing access to scheme information
- Lack of personalized guidance on which schemes match individual circumstances
- Scattered information across multiple government portals
- Limited digital literacy among rural and economically disadvantaged populations

Citizens often miss out on financial benefits, healthcare coverage, educational support, and other welfare programs simply because they don't know these schemes exist or how to access them.

---

## 2. Objectives

### Primary Objectives
- Democratize access to government scheme information through an AI-powered conversational interface
- Provide multilingual support to break language barriers (English, Hindi, Kannada, Telugu, Tamil, Malayalam)
- Deliver personalized scheme recommendations based on user profiles and eligibility criteria
- Simplify complex eligibility requirements into easy-to-understand language
- Enable citizens to discover relevant schemes through natural language queries

### Secondary Objectives
- Create an accessible, user-friendly interface suitable for users with varying digital literacy levels
- Build a scalable platform that can accommodate new schemes and languages
- Provide voice input capabilities for users who prefer speaking over typing
- Maintain an admin panel for easy scheme management and updates

---

## 3. Target Users

### Primary Users
- **Rural Citizens**: Farmers, agricultural workers, and rural families seeking agricultural, housing, and financial schemes
- **Low-Income Families**: Individuals and families eligible for welfare programs based on income criteria
- **Students**: Young individuals seeking educational scholarships and skill development programs
- **Women**: Female citizens looking for women-specific welfare schemes
- **Small Business Owners**: Entrepreneurs and self-employed individuals seeking business loans and support

### Secondary Users
- **Government Officials**: Administrators who need to add, update, or manage scheme information
- **NGO Workers**: Social workers helping communities access government benefits
- **Digital Literacy Centers**: Operators assisting citizens in scheme discovery

### User Characteristics
- Age range: 18-65 years
- Digital literacy: Basic to intermediate
- Language preference: Regional languages preferred over English
- Device access: Primarily mobile devices, some desktop users
- Internet connectivity: Variable (2G to 4G)

---

## 4. Functional Requirements

### 4.1 Conversational AI Chat Interface
- **FR-1.1**: System shall provide a chat interface where users can ask questions in natural language
- **FR-1.2**: System shall understand user queries using keyword matching and synonym expansion
- **FR-1.3**: System shall match user queries to relevant government schemes from the database
- **FR-1.4**: System shall display scheme details including name, description, eligibility, benefits, and application links
- **FR-1.5**: System shall handle queries in multiple languages (English, Hindi, Kannada, Telugu, Tamil, Malayalam)
- **FR-1.6**: System shall provide fallback responses when no matching scheme is found

### 4.2 Multilingual Support
- **FR-2.1**: System shall support 6 languages: English, Hindi, Kannada, Telugu, Tamil, Malayalam
- **FR-2.2**: System shall allow users to select their preferred language via dropdown selector
- **FR-2.3**: System shall translate AI responses to the selected language using Google Translator API
- **FR-2.4**: System shall maintain language preference throughout the user session
- **FR-2.5**: System shall display language names in their native scripts

### 4.3 Eligibility Checker
- **FR-3.1**: System shall provide a form-based eligibility checker for personalized scheme recommendations
- **FR-3.2**: System shall collect user profile information including:
  - Age
  - Gender
  - State of residence
  - Annual income
  - Occupation/employment status
  - Category (General, OBC, SC, ST)
  - Education level
  - Disability status
- **FR-3.3**: System shall validate user inputs for data type and range constraints
- **FR-3.4**: System shall match user profile against scheme eligibility criteria
- **FR-3.5**: System shall calculate eligibility scores for each scheme based on profile match
- **FR-3.6**: System shall display eligible schemes ranked by relevance score
- **FR-3.7**: System shall show why user is eligible for each recommended scheme
- **FR-3.8**: System shall allow users to update their profile and re-check eligibility

### 4.4 Admin Panel
- **FR-4.1**: System shall provide an admin interface for scheme management
- **FR-4.2**: System shall allow admins to add new schemes with the following fields:
  - Scheme name
  - Description
  - Eligibility criteria (age, gender, income, state, category, occupation)
  - Benefits
  - Application process
  - Official website link
  - Keywords for search matching
- **FR-4.3**: System shall allow admins to edit existing scheme information
- **FR-4.4**: System shall allow admins to delete schemes from the database
- **FR-4.5**: System shall display all schemes in a searchable, sortable table
- **FR-4.6**: System shall validate admin inputs before saving to database
- **FR-4.7**: System shall provide confirmation dialogs for destructive actions (delete)
- **FR-4.8**: System shall show success/error messages for all admin operations

### 4.5 Voice Input (Optional Enhancement)
- **FR-5.1**: System shall provide voice input capability using Web Speech API
- **FR-5.2**: System shall convert speech to text in the selected language
- **FR-5.3**: System shall display transcribed text in the chat input field
- **FR-5.4**: System shall allow users to edit transcribed text before sending
- **FR-5.5**: System shall handle speech recognition errors gracefully

### 4.6 Search and Discovery
- **FR-6.1**: System shall support keyword-based scheme search
- **FR-6.2**: System shall match user queries against scheme names, descriptions, and keywords
- **FR-6.3**: System shall use synonym expansion for better query matching (e.g., "farmer" matches "agriculture")
- **FR-6.4**: System shall rank search results by relevance
- **FR-6.5**: System shall display "no results found" message when no schemes match

---

## 5. Non-Functional Requirements

### 5.1 Performance
- **NFR-1.1**: Chat responses shall be generated within 2 seconds under normal load
- **NFR-1.2**: Translation API calls shall complete within 3 seconds
- **NFR-1.3**: Eligibility checker shall process user profile and return results within 1 second
- **NFR-1.4**: Admin panel operations (add/edit/delete) shall complete within 2 seconds
- **NFR-1.5**: System shall support at least 100 concurrent users without performance degradation

### 5.2 Usability
- **NFR-2.1**: Interface shall be intuitive and require minimal training for basic operations
- **NFR-2.2**: Chat interface shall follow familiar messaging app patterns
- **NFR-2.3**: Forms shall provide clear labels, placeholders, and validation messages
- **NFR-2.4**: System shall be accessible on mobile devices (responsive design)
- **NFR-2.5**: Font sizes shall be readable on screens as small as 5 inches
- **NFR-2.6**: Color contrast shall meet WCAG 2.1 Level AA standards for readability

### 5.3 Reliability
- **NFR-3.1**: System shall have 99% uptime during business hours (9 AM - 6 PM IST)
- **NFR-3.2**: System shall handle API failures gracefully with fallback mechanisms
- **NFR-3.3**: Database operations shall use transactions to ensure data consistency
- **NFR-3.4**: System shall log errors for debugging and monitoring
- **NFR-3.5**: System shall recover from translation API failures by displaying original text

### 5.4 Scalability
- **NFR-4.1**: Database schema shall support addition of new schemes without code changes
- **NFR-4.2**: Translation module shall support addition of new languages through configuration
- **NFR-4.3**: System architecture shall allow horizontal scaling for increased load
- **NFR-4.4**: Database shall efficiently handle up to 10,000 schemes

### 5.5 Security
- **NFR-5.1**: Admin panel shall require authentication (future enhancement)
- **NFR-5.2**: User profile data shall not be stored permanently (session-based only)
- **NFR-5.3**: System shall sanitize all user inputs to prevent injection attacks
- **NFR-5.4**: API keys shall be stored in environment variables, not in code
- **NFR-5.5**: HTTPS shall be enforced for all production deployments

### 5.6 Maintainability
- **NFR-6.1**: Code shall follow PEP 8 style guidelines for Python
- **NFR-6.2**: Functions shall be modular with single responsibility
- **NFR-6.3**: Database models shall use SQLAlchemy ORM for abstraction
- **NFR-6.4**: Frontend code shall be organized by feature (scripts, styles, assets)
- **NFR-6.5**: System shall include inline comments for complex logic

### 5.7 Compatibility
- **NFR-7.1**: System shall work on modern browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
- **NFR-7.2**: System shall be responsive and functional on screen sizes from 320px to 1920px
- **NFR-7.3**: System shall degrade gracefully when JavaScript is disabled (show static message)
- **NFR-7.4**: Voice input shall work on browsers supporting Web Speech API (Chrome, Edge)

---

## 6. Technical Requirements

### 6.1 Technology Stack

#### Backend
- **Language**: Python 3.8+
- **Framework**: Flask 2.x
- **Database**: SQLite (development), PostgreSQL (production recommended)
- **ORM**: SQLAlchemy
- **API Integration**: Google Translator API (googletrans library)

#### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Custom styling with responsive design
- **JavaScript**: Vanilla ES6+ (no frameworks)
- **APIs**: Web Speech API for voice input

#### Deployment
- **Platform**: Heroku, AWS, or similar PaaS
- **Web Server**: Gunicorn (production)
- **Process Management**: Procfile for deployment configuration

### 6.2 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Chat UI    │  │  Eligibility │  │  Admin Panel │      │
│  │  (chat.js)   │  │   (app.js)   │  │  (admin.js)  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                    REST API (JSON)
                            │
┌─────────────────────────────────────────────────────────────┐
│                        Backend Layer                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    Flask App (app.py)                 │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐     │   │
│  │  │   Routes   │  │   Models   │  │  Database  │     │   │
│  │  └────────────┘  └────────────┘  └────────────┘     │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    Utils Layer                        │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌───────────┐  │   │
│  │  │ Recommender  │  │  Eligibility │  │Translator │  │   │
│  │  │              │  │   Checker    │  │           │  │   │
│  │  └──────────────┘  └──────────────┘  └───────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                    ┌───────┴───────┐
                    │               │
            ┌───────▼──────┐  ┌────▼──────────┐
            │   SQLite DB  │  │  Google Trans │
            │  (schemes)   │  │      API      │
            └──────────────┘  └───────────────┘
```

### 6.3 Database Schema

#### Scheme Table
```sql
CREATE TABLE scheme (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    eligibility TEXT NOT NULL,
    benefits TEXT NOT NULL,
    how_to_apply TEXT NOT NULL,
    official_link TEXT,
    keywords TEXT,
    min_age INTEGER,
    max_age INTEGER,
    gender TEXT,
    min_income REAL,
    max_income REAL,
    states TEXT,
    categories TEXT,
    occupations TEXT,
    education_level TEXT,
    disability_required BOOLEAN
);
```

### 6.4 API Endpoints

#### Chat & Recommendation
- `POST /chat` - Process user query and return matching schemes
  - Request: `{ "message": "string", "language": "string" }`
  - Response: `{ "response": "string", "schemes": [...] }`

- `POST /check-eligibility` - Check user eligibility for schemes
  - Request: `{ "age": int, "gender": "string", "income": float, ... }`
  - Response: `{ "eligible_schemes": [...] }`

#### Admin Operations
- `GET /schemes` - Retrieve all schemes
  - Response: `{ "schemes": [...] }`

- `POST /schemes` - Add new scheme
  - Request: `{ scheme_data }`
  - Response: `{ "success": true, "scheme_id": int }`

- `PUT /schemes/<id>` - Update existing scheme
  - Request: `{ scheme_data }`
  - Response: `{ "success": true }`

- `DELETE /schemes/<id>` - Delete scheme
  - Response: `{ "success": true }`

### 6.5 External Dependencies

#### Python Packages (requirements.txt)
```
Flask==2.3.0
Flask-SQLAlchemy==3.0.0
Flask-CORS==4.0.0
googletrans==4.0.0rc1
gunicorn==21.2.0
```

#### Browser APIs
- Web Speech API (for voice input)
- Fetch API (for AJAX requests)
- LocalStorage API (for language preference)

---

## 7. Data Requirements

### 7.1 Scheme Data
- **Source**: Government scheme portals, official notifications
- **Format**: JSON for initial seeding, SQLite database for runtime
- **Volume**: Initial dataset of 50-100 schemes, expandable to 10,000+
- **Update Frequency**: Monthly or as new schemes are announced

### 7.2 User Data
- **Storage**: Session-based only (not persisted)
- **Privacy**: No personal data stored in database
- **Retention**: Cleared on browser session end

### 7.3 Keywords and Synonyms
- **Purpose**: Improve search matching accuracy
- **Examples**: 
  - "farmer" → "agriculture", "krishi", "kisan"
  - "woman" → "female", "mahila", "women"
  - "student" → "education", "scholarship", "vidyarthi"

---

## 8. Assumptions and Constraints

### 8.1 Assumptions
- Users have access to internet-enabled devices (mobile or desktop)
- Users have basic digital literacy to navigate web interfaces
- Government scheme information is publicly available and accurate
- Google Translator API provides acceptable translation quality for supported languages
- Scheme eligibility criteria can be represented as structured data fields
- Users are comfortable providing personal information for eligibility checking
- Admin users have basic understanding of scheme details and eligibility criteria

### 8.2 Constraints
- **Budget**: Limited to free-tier services for initial deployment
- **Translation**: Dependent on third-party API (Google Translator) availability and accuracy
- **Language Support**: Limited to 6 languages initially (expandable based on demand)
- **Authentication**: Admin panel lacks authentication in MVP (security risk)
- **Offline Access**: System requires internet connectivity (no offline mode)
- **AI Capabilities**: Uses rule-based matching, not advanced NLP or machine learning
- **Data Accuracy**: Relies on manual data entry; no automated scheme scraping
- **Voice Input**: Limited to browsers supporting Web Speech API

### 8.3 Out of Scope (Future Enhancements)
- User authentication and profile persistence
- Application form pre-filling and submission
- Document upload and verification
- SMS/WhatsApp integration for notifications
- Advanced NLP using LLMs (GPT, BERT)
- Real-time scheme updates via web scraping
- Mobile native applications (iOS/Android)
- Integration with government portals for application tracking
- Analytics dashboard for usage statistics
- Multi-tenant support for different states/regions

---

## 9. Success Criteria

### 9.1 Functional Success
- ✅ Users can discover schemes through natural language chat in 6 languages
- ✅ Eligibility checker accurately matches users to relevant schemes
- ✅ Admin panel allows CRUD operations on scheme database
- ✅ System handles at least 50 schemes with accurate matching

### 9.2 User Experience Success
- ✅ 80% of users can complete eligibility check without assistance
- ✅ Chat responses are relevant to user queries in 90% of cases
- ✅ Interface is usable on mobile devices without horizontal scrolling
- ✅ Language switching works seamlessly without page reload

### 9.3 Technical Success
- ✅ System deploys successfully on cloud platform (Heroku/AWS)
- ✅ API response times under 3 seconds for 95% of requests
- ✅ No critical bugs in core functionality (chat, eligibility, admin)
- ✅ Code passes basic quality checks (linting, no console errors)

---

## 10. Risks and Mitigation

### 10.1 Technical Risks
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Translation API rate limits | High | Medium | Implement caching, fallback to original text |
| Database performance with large datasets | Medium | Low | Add indexing, consider PostgreSQL migration |
| Browser compatibility issues | Medium | Medium | Test on multiple browsers, provide fallbacks |
| Voice input not working on all devices | Low | High | Make voice input optional, provide text input |

### 10.2 Data Risks
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Outdated scheme information | High | High | Implement admin alerts, regular data audits |
| Incorrect eligibility matching | High | Medium | Thorough testing, user feedback mechanism |
| Missing scheme data fields | Medium | Medium | Validate data entry, provide default values |

### 10.3 User Adoption Risks
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Low awareness of platform | High | High | Partner with NGOs, government outreach |
| Language barriers despite translation | Medium | Medium | Improve translation quality, add more languages |
| Distrust of AI recommendations | Medium | Medium | Show eligibility reasoning, link to official sources |

---

## 11. Timeline and Milestones

### Phase 1: MVP Development (Completed)
- ✅ Database schema and models
- ✅ Basic Flask API endpoints
- ✅ Chat interface with keyword matching
- ✅ Multilingual support with translation
- ✅ Eligibility checker
- ✅ Admin panel for scheme management

### Phase 2: Enhancement (Future)
- 🔲 User authentication for admin panel
- 🔲 Improved NLP using machine learning
- 🔲 Voice input optimization
- 🔲 Performance optimization and caching
- 🔲 Comprehensive testing suite

### Phase 3: Scale (Future)
- 🔲 Production deployment with monitoring
- 🔲 User feedback collection mechanism
- 🔲 Analytics and usage tracking
- 🔲 Additional language support
- 🔲 Mobile app development

---

## 12. Appendix

### 12.1 Glossary
- **Scheme**: Government welfare program offering benefits to eligible citizens
- **Eligibility Criteria**: Conditions that must be met to qualify for a scheme
- **NLP**: Natural Language Processing - technology for understanding human language
- **ORM**: Object-Relational Mapping - technique for database interaction using objects
- **MVP**: Minimum Viable Product - basic version with core features

### 12.2 References
- Government of India Schemes Portal: https://www.india.gov.in/
- MyScheme Portal: https://www.myscheme.gov.in/
- Flask Documentation: https://flask.palletsprojects.com/
- Web Speech API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API

---

**Document Version**: 1.0  
**Last Updated**: February 14, 2026  
**Status**: Complete