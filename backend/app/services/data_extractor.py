import re

# Comprehensive list of regex patterns for common lab tests
# This is a starting list and can be expanded
patterns = {
    'HbA1c': {
        'regex': r'(?:HbA1c|Hemoglobin A1c|Glycated Hemoglobin)[\s:]*(\d+\.?\d*)',
        'unit': '%',
        'range': (4.0, 5.7),
        'category': 'Diabetes'
    },
    'Glucose Fasting': {
        'regex': r'(?:Glucose\s*[-\s]*Fasting|Fasting Blood Sugar|FBS)[\s:]*(\d+)',
        'unit': 'mg/dL',
        'range': (70, 100),
        'category': 'Diabetes'
    },
    'Total Cholesterol': {
        'regex': r'(?:Total Cholesterol|Cholesterol, Total)[\s:]*(\d+)',
        'unit': 'mg/dL',
        'range': (0, 200),
        'category': 'Lipid Profile'
    },
    'HDL Cholesterol': {
        'regex': r'(?:HDL Cholesterol|HDL|High Density Lipoprotein)[\s:]*(\d+)',
        'unit': 'mg/dL',
        'range': (40, 100), # > 60 is optimal, < 40 is low
        'category': 'Lipid Profile'
    },
    'LDL Cholesterol': {
        'regex': r'(?:LDL Cholesterol|LDL|Low Density Lipoprotein)[\s:]*(\d+)',
        'unit': 'mg/dL',
        'range': (0, 100),
        'category': 'Lipid Profile'
    },
    'Triglycerides': {
        'regex': r'(?:Triglycerides)[\s:]*(\d+)',
        'unit': 'mg/dL',
        'range': (0, 150),
        'category': 'Lipid Profile'
    },
    'TSH': {
        'regex': r'(?:TSH|Thyroid Stimulating Hormone|Thyrotropin)[\s:]*(\d+\.?\d*)',
        'unit': 'mIU/L',
        'range': (0.4, 4.0),
        'category': 'Thyroid'
    },
    'Hemoglobin': {
        'regex': r'(?:Hemoglobin|Hb)[\s:]*(\d+\.?\d*)',
        'unit': 'g/dL',
        'range': (12.0, 17.0), # Varies by gender, using broad range
        'category': 'CBC'
    },
    'WBC': {
        'regex': r'(?:WBC|White Blood Cell Count)[\s:]*(\d+\.?\d*)',
        'unit': 'K/uL',
        'range': (4.0, 11.0),
        'category': 'CBC'
    },
     'Platelets': {
        'regex': r'(?:Platelet Count|Platelets|PLT)[\s:]*(\d+)',
        'unit': 'K/uL',
        'range': (150, 450),
        'category': 'CBC'
    },
    # Kidney Function
    'Serum Creatinine': {
        'regex': r'(?:Serum Creatinine|Creatinine)[\s:]*(\d+\.?\d*)',
        'unit': 'mg/dL',
        'range': (0.6, 1.2),
        'category': 'Kidney Function'
    },
    'BUN': {
        'regex': r'(?:Blood Urea Nitrogen|BUN)[\s:]*(\d+\.?\d*)',
        'unit': 'mg/dL',
        'range': (7, 20),
        'category': 'Kidney Function'
    },
    'Uric Acid': {
        'regex': r'(?:Uric Acid)[\s:]*(\d+\.?\d*)',
        'unit': 'mg/dL',
        'range': (3.5, 7.2),
        'category': 'Kidney Function'
    },
    # Liver Function
    'AST (SGOT)': {
        'regex': r'(?:Aspartate Aminotransferase|AST|SGOT)[\s:]*(\d+)',
        'unit': 'U/L',
        'range': (10, 40),
        'category': 'Liver Function'
    },
    'ALT (SGPT)': {
        'regex': r'(?:Alanine Aminotransferase|ALT|SGPT)[\s:]*(\d+)',
        'unit': 'U/L',
        'range': (7, 56),
        'category': 'Liver Function'
    },
    'Alkaline Phosphatase': {
        'regex': r'(?:Alkaline Phosphatase|ALP)[\s:]*(\d+)',
        'unit': 'U/L',
        'range': (44, 147),
        'category': 'Liver Function'
    },
    'Total Bilirubin': {
        'regex': r'(?:Total Bilirubin)[\s:]*(\d+\.?\d*)',
        'unit': 'mg/dL',
        'range': (0.1, 1.2),
        'category': 'Liver Function'
    },
    # Vitamins
    'Vitamin D': {
        'regex': r'(?:Vitamin D|25-OH Vitamin D)[\s:]*(\d+\.?\d*)',
        'unit': 'ng/mL',
        'range': (30, 100),
        'category': 'Vitamins'
    },
    'Vitamin B12': {
        'regex': r'(?:Vitamin B12|Cobalamin)[\s:]*(\d+)',
        'unit': 'pg/mL',
        'range': (200, 900),
        'category': 'Vitamins'
    },
    # Electrolytes
    'Sodium': {
        'regex': r'(?:Sodium|Na\+)[\s:]*(\d+)',
        'unit': 'mmol/L',
        'range': (135, 145),
        'category': 'Electrolytes'
    },
    'Potassium': {
        'regex': r'(?:Potassium|K\+)[\s:]*(\d+\.?\d*)',
        'unit': 'mmol/L',
        'range': (3.5, 5.0),
        'category': 'Electrolytes'
    },
    'Calcium': {
        'regex': r'(?:Calcium|Ca)[\s:]*(\d+\.?\d*)',
        'unit': 'mg/dL',
        'range': (8.5, 10.2),
        'category': 'Electrolytes'
    }
}

def determine_status(value, range_tuple, param_name):
    min_val, max_val = range_tuple
    
    if param_name == 'HDL Cholesterol':
        if value >= 60: return 'optimal'
        elif value < 40: return 'low'
        return 'normal'
        
    if value < min_val:
        return 'low'
    elif value > max_val:
        return 'high'
    return 'normal'

def extract_parameters(text: str):
    """
    Parses the text and extracts medical parameters based on regex patterns.
    Returns a list of dictionaries with parameter details.
    """
    results = []
    
    for param_name, config in patterns.items():
        match = re.search(config['regex'], text, re.IGNORECASE)
        if match:
            try:
                value = float(match.group(1))
                status = determine_status(value, config['range'], param_name)
                
                result = {
                    "parameter": param_name,
                    "value": value,
                    "unit": config['unit'],
                    "status": status,
                    "normal_range": config['range'],
                    "category": config['category'],
                    "reference_range_display": f"{config['range'][0]} - {config['range'][1]} {config['unit']}"
                }
                results.append(result)
            except ValueError:
                continue
                
    return results
