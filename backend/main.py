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
    print(f"Account SID number is {account_sid}")
    auth_token = os.getenv("TWILIO_AUTH_TOKEN")
    from_whatsapp_number = os.getenv("TWILIO_WHATSAPP_NUMBER")
    print(f"From WA number is {from_whatsapp_number}")
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
        from_=from_whatsapp_number,
        body=message_body,
        to=parent_number
    )

    return message.sid

op = send_whatsapp_message("Yash","He learnt about AI and ADK today")
print(op)

