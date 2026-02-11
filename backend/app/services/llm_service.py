import os
import google.generativeai as genai

async def generate_explanation(parameter: str, value: float, unit: str, status: str, normal_range: str) -> str:
    """
    Generate a simple explanation for a medical parameter using Google Gemini.
    """
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        return f"The {parameter} level is {value} {unit}, which is considered {status}. Please consult your doctor for a detailed diagnosis."

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-pro')

    user_prompt = f"""
    You are a helpful and reassuring medical assistant explaining lab test results to a patient. 
    Keep explanations simple, non-alarmist, and under 3 sentences.

    Explain this test result:
    - Test: {parameter}
    - Value: {value} {unit}
    - Status: {status}
    - Normal Range: {normal_range}
    
    Explain what this test measures and what the current status means in plain language.
    """

    try:
        response = model.generate_content(user_prompt)
        return response.text
    except Exception as e:
        print(f"Gemini Error: {e}")
        return f"Unable to generate explanation at this time. ({parameter}: {value} {unit})"

async def get_health_recommendations(abnormal_parameters: list) -> str:
    """
    Generate overall health recommendations based on abnormal values using Google Gemini.
    """
    if not abnormal_parameters:
        return "All your results appear to be within the normal range. Keep up the good work maintaining a healthy lifestyle!"

    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        items = ", ".join([f"{p['parameter']} ({p['status']})" for p in abnormal_parameters])
        return f"We noticed some values outside the normal range: {items}. It is recommended to discuss these results with your healthcare provider."

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-pro')

    params_desc = "\n".join([f"- {p['parameter']}: {p['value']} {p['unit']} ({p['status']})" for p in abnormal_parameters])

    user_prompt = f"""
    You are a medical assistant providing general lifestyle advice based on lab results. 
    Do not diagnose conditions. Focus on diet, exercise, and follow-up. Add a disclaimer.

    Based on these abnormal lab results, provide a consolidated summary of recommendations:
    {params_desc}
    
    Format nicely with bullet points. Keep it concise.
    """

    try:
        response = model.generate_content(user_prompt)
        return response.text
    except Exception as e:
        print(f"Gemini Recommendation Error: {e}")
        return "Unable to generate specific recommendations at this time. Please show this report to your doctor."
