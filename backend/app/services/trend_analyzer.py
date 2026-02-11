from datetime import datetime
from typing import List, Dict

async def analyze_trends(reports_data: List[Dict]) -> Dict:
    """
    Analyze trends across multiple medical reports.
    
    Args:
        reports_data: List of dictionaries, each containing 'filename', 'date' (optional), and 'parameters'.
    
    Returns:
        Dictionary containing trend analysis, common parameters, and change direction.
    """
    if not reports_data:
        return {}

    # 1. Identify all unique parameters across reports
    all_params = set()
    for report in reports_data:
        for param in report.get('parameters', []):
            all_params.add(param['parameter'])
            
    trends = {}
    
    # 2. Build time-series data for each parameter
    for param_name in all_params:
        series = []
        for report in reports_data:
            # Find this parameter in the report
            match = next((p for p in report['parameters'] if p['parameter'] == param_name), None)
            
            if match:
                entry = {
                    "date": report.get('date', report['filename']), # Use filename as proxy for date if date missing
                    "value": match['value'],
                    "unit": match['unit'],
                    "status": match['status']
                }
                series.append(entry)
        
        # Only track if we have at least 2 data points (to show a trend)
        if len(series) >= 1:
            # Sort by "date" (naive sorting by string for now, could be improved with real date parsing)
            # Assuming filenames might have dates or user uploads in order
            
            # Calculate simple change summary
            direction = "stable"
            if len(series) >= 2:
                last_val = series[-1]['value']
                prev_val = series[-2]['value']
                if last_val > prev_val:
                    direction = "increasing"
                elif last_val < prev_val:
                    direction = "decreasing"
            
            trends[param_name] = {
                "series": series,
                "direction": direction,
                "latest_value": series[-1]['value'],
                "unit": series[-1]['unit']
            }
            
    return {
        "report_count": len(reports_data),
        "trends": trends
    }
