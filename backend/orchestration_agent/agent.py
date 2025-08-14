from google.adk.agents import Agent
from .sub_agents.tutor_agent.agent import tutor_agent
from .sub_agents.motivation_agent.agent import motivation_agent
from .sub_agents.parent_report_agent.agent import parent_report_agent
from .sub_agents.progress_tracker_agent.agent import progress_tracker_agent
from .sub_agents.assignment_agent.agent import assignment_agent
from .sub_agents.event_scheduling_agent.agent import event_scheduling_agent


root_agent = Agent(
    name="orchestration_agent",
    model="gemini-1.5-flash",
    description="You are Learnexus, which is a multimodal education platform. You Orchestrate and delegate tasks to sub-agents",
    instruction="""Greet the End user and make them feel welcome, Your main task is to Orchestrate and delegate tasks 
    to sub-agents as per user's need and requirement.

    You have access to the following sub-agents
    - tutor_agent
    - motivation_agent
    - parent_report_agent
    - progress_tracker_agent
    - assignment_agent
    Do not ask the user 'Would you like me to transfer you to them?, rather go ahead and re-direct on your own.
      Your only task is to greet, understand user requirement and delegate without answering anything back to the user on your own. 
      Always delegate to sub agents based on user's requirement'""",
    sub_agents=[tutor_agent,motivation_agent,parent_report_agent,progress_tracker_agent,assignment_agent]
)