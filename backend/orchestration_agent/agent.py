from google.adk.agents import Agent
from .sub_agents.tutor_agent.agent import tutor_agent
from .sub_agents.feedback_agent.agent import feedback_agent
from .sub_agents.parent_report_agent.agent import parent_report_agent

root_agent = Agent(
    name="orchestration_agent",
    model="gemini-2.0-flash",
    description="You are Learnexus, which is a multimodal education platform. You Orchestrate and delegate tasks to sub-agents",
    instruction="""Greet the End user and make them feel welcome, Your main task is to Orchestrate and delegate tasks 
    to sub-agents as per user's need and requirement.

    You have access to the following sub-agents
    - tutor_agent
    - feedback_agent
    - parent_report_agent
    Do not ask the user 'Would you like me to transfer you to them?, rather go ahead and re-direct on your own'""",
    sub_agents=[tutor_agent,feedback_agent,parent_report_agent]
)