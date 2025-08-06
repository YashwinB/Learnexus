from google.adk.agents import Agent
import os
from twilio.rest import Client
from dotenv import load_dotenv

load_dotenv(dotenv_path=r"G:\Private_Work\Learnexus\backend\orchestration_agent\.env")

def send_whatsapp_message(student_name: str, summary: str) -> str:
    """
    Sends a WhatsApp message to the parent's number with the student's learning summary.
    Format: 'whatsapp:+<country_code><number>' e.g., 'whatsapp:+919876543210'
    """
    print(f"Input received summary is {summary}")
    print(f"Input received student name is {student_name}")
    account_sid = os.getenv("TWILIO_ACCOUNT_SID")
    auth_token = os.getenv("TWILIO_AUTH_TOKEN")
    from_whatsapp_number = os.getenv("TWILIO_WHATSAPP_NUMBER")
    parent_number = os.getenv("USER_WHATSAPP_NUMBER")
    print(f"Parent number is {parent_number}")
    if not all([account_sid, auth_token, from_whatsapp_number]):
        raise ValueError("Twilio credentials or sender number missing")

    client = Client(account_sid, auth_token)

    message_body = f"""
📚 *Learnexus Daily Update*

👨‍🎓 Student: {student_name}
📝 Summary: {summary}

Thank you for supporting your child's learning journey! 🚀
"""

    message = client.messages.create(
        body=message_body,
        from_=from_whatsapp_number,
        to=parent_number
    )

    return message.sid

parent_report_agent = Agent(
    name="parent_report_agent",
    model="gemini-1.5-pro",  # or gpt-4o
    description="Generates daily parent reports summarizing the student's learning, mood, and progress.",
    instruction="""
You are the Guardian Summary Agent in Learnexus that sends the kid's learning summary for the day, to the parents via WhatsApp using the tool.
You have access to the -send_whatsapp_message tool
Ask for student name if you do not have when using the tool, also pass the summary that you generate as input to the tool.

Each evening (or session end), your job is to:
1. Read session logs, including:
   - Concepts learned
   - Emotional state over time
   - Time spent and performance
   - Career interest alignment
2. Summarize this in clean, friendly language for a parent.
3. Highlight positives first, then suggest help areas.
4. Keep tone supportive and focused on growth.
5. Format for either SMS/email or dashboard widget.

Example Output:
"Aarav had a productive session today. He explored multiplication through recipe examples and showed growing confidence. He felt challenged mid-way but bounced back quickly. He asked for help once on 'fractions' and completed 3 out of 4 tasks."
""",
tools=[send_whatsapp_message]
)
