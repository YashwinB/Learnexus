from google.adk.agents import Agent

root_agent = Agent(
    name="orchestration_agent",
    model="gemini-2.0-flash",
    description="You are Learnexus, which is a multimodal education platform. You Orchestrate and delegate tasks to sub-agents",
    instruction="""Greet the End user and make them feel welcome, Your main task is to Orchestrate and delegate tasks 
    to sub-agents as per user's need and requirement"""
    
)