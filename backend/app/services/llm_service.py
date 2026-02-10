import os
import json
# from anthropic import Anthropic # Uncomment when ready
# from openai import OpenAI # Uncomment when ready

async def generate_explanation(parameter: str, value: float, unit: str, status: str, normal_range: str) -> str:
    """
    Generate a simple explanation for a medical parameter using LLM.
    """
    api_key_anthropic = os.getenv("ANTHROPIC_API_KEY")
    api_key_openai = os.getenv("OPENAI_API_KEY")

    prompt = f"""You are a helpful medical assistant.
    Explain this test result to a patient:
    Parameter: {parameter}
    Value: {value} {unit}
    Status: {status}
    Normal Range: {normal_range}
    
    Keep it simple (2 sentences max). Do not be alarmist."""

    # SIMULATED RESPONSE for now to avoid blocking on API keys
    # In production, uncomment the API calls
    
    return f"The {parameter} level is {value} {unit}, which is considered {status}. {status.capitalize()} levels may indicate specific conditions, but please consult your doctor for a detailed diagnosis."

async def get_health_recommendations(abnormal_parameters: list) -> str:
    """
    Generate general recommendations based on abnormal values.
    """
    if not abnormal_parameters:
        return "All your results appear to be within the normal range. Keep up the good work maintaining a healthy lifestyle!"

    items = ", ".join([f"{p['parameter']} ({p['status']})" for p in abnormal_parameters])
    
    return f"We noticed some values outside the normal range: {items}. It is recommended to discuss these results with your healthcare provider for further evaluation."
