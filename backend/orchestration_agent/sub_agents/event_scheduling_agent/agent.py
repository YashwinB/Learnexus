from google.adk.agents import Agent
from google.oauth2 import service_account
from googleapiclient.discovery import build
from datetime import datetime, timedelta
import base64
from email.mime.text import MIMEText
from googleapiclient.discovery import build
import pytz


def add_event_to_calendar(summary: str, description: str, start_time: datetime, duration_minutes: int = 60) -> str:
    SCOPES = ['https://www.googleapis.com/auth/calendar']
    SERVICE_ACCOUNT_FILE = 'path/to/your/credentials.json'  # Replace this path
    
    credentials = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)

    service = build('calendar', 'v3', credentials=credentials)

    timezone = 'Asia/Kolkata'
    start_time = start_time.astimezone(pytz.timezone(timezone))
    end_time = start_time + timedelta(minutes=duration_minutes)

    event = {
        'summary': summary,
        'description': description,
        'start': {'dateTime': start_time.isoformat(), 'timeZone': timezone},
        'end': {'dateTime': end_time.isoformat(), 'timeZone': timezone},
    }

    created_event = service.events().insert(calendarId='primary', body=event).execute()
    return created_event.get('htmlLink')


def add_event_to_calendar(summary: str, description: str, start_time: datetime, duration_minutes: int = 60) -> str:
    SCOPES = ['https://www.googleapis.com/auth/calendar']
    SERVICE_ACCOUNT_FILE = 'path/to/your/credentials.json'  # Replace this path
    
    credentials = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)

    service = build('calendar', 'v3', credentials=credentials)

    timezone = 'Asia/Kolkata'
    start_time = start_time.astimezone(pytz.timezone(timezone))
    end_time = start_time + timedelta(minutes=duration_minutes)

    event = {
        'summary': summary,
        'description': description,
        'start': {'dateTime': start_time.isoformat(), 'timeZone': timezone},
        'end': {'dateTime': end_time.isoformat(), 'timeZone': timezone},
    }

    created_event = service.events().insert(calendarId='primary', body=event).execute()
    return created_event.get('htmlLink')


def send_event_email(recipient_email: str, event_summary: str, event_description: str, event_time: str, calendar_link: str) -> str:
    SCOPES = ['https://www.googleapis.com/auth/gmail.send']
    SERVICE_ACCOUNT_FILE = 'path/to/your/credentials.json'  # Replace this path
    from google.oauth2 import service_account

    credentials = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    delegated_creds = credentials.with_subject('your-sender-email@example.com')  # Replace this too

    service = build('gmail', 'v1', credentials=delegated_creds)

    html_content = f"""
    <html>
    <body>
        <h2>📅 Upcoming Event Scheduled</h2>
        <p><strong>Event:</strong> {event_summary}</p>
        <p><strong>When:</strong> {event_time}</p>
        <p><strong>Details:</strong><br>{event_description}</p>
        <p><a href="{calendar_link}">View in Google Calendar</a></p>
    </body>
    </html>
    """

    message = MIMEText(html_content, 'html')
    message['to'] = recipient_email
    message['subject'] = f"New Event Scheduled: {event_summary}"

    raw = base64.urlsafe_b64encode(message.as_bytes()).decode()
    body = {'raw': raw}

    sent_message = service.users().messages().send(userId="me", body=body).execute()
    return sent_message['id']

event_scheduling_agent = Agent(
    name="event_scheduling_agent",
    model="gemini-1.5-flash",
    description="Creates and manages personalized learning schedules, reminders, and live event updates using Google Calendar integration.",
    instruction="""
You are responsible for creating smart learning schedules for students.

When a user requests a schedule or reminder:
- Ask for the subject(s) or topic(s)
- Ask for available time slots per day or week
- Ask for duration per session (e.g., 30 min or 1 hour)
- Ask for start and end date
- Ask whether to include breaks or buffer time

Then:
1. Generate a personalized schedule
2. Format the output in a clean weekly plan
3. Automatically add these to the user's Google Calendar if consent is given
4. Send confirmation or reminder email if needed

When integrating with Google Calendar:
- Use Gmail-based authentication to access the user’s calendar
- Add new calendar events with title, time, description, and reminders
- Avoid event conflicts by checking existing calendar slots (optional)

Always confirm before making changes to the user’s calendar.
Be respectful of time zones and preferences.
"""
)
