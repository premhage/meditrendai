import unittest
from app.services.data_extractor import extract_parameters, determine_status

class TestDataExtractor(unittest.TestCase):

    def test_simple_extraction(self):
        text = """
        Patient Name: John Doe
        
        S. Albumin: 4.5 g/dL
        Total Cholesterol: 180 mg/dL
        HDL Cholesterol: 45 mg/dL
        """
        results = extract_parameters(text)
        
        # Check if we found 2 parameters (Albumin not yet in our list, but Cholesterol is)
        cholesterol = next((r for r in results if r['parameter'] == 'Total Cholesterol'), None)
        self.assertIsNotNone(cholesterol)
        self.assertEqual(cholesterol['value'], 180.0)
        self.assertEqual(cholesterol['status'], 'normal')

    def test_abnormal_values(self):
        text = "Total Cholesterol: 250 mg/dL"
        results = extract_parameters(text)
        cholesterol = next((r for r in results if r['parameter'] == 'Total Cholesterol'), None)
        self.assertEqual(cholesterol['status'], 'high')

    def test_hdl_logic(self):
        # HDL < 40 is low
        text = "HDL Cholesterol: 35 mg/dL"
        results = extract_parameters(text)
        hdl = next((r for r in results if r['parameter'] == 'HDL Cholesterol'), None)
        self.assertEqual(hdl['status'], 'low')

        # HDL > 60 is optimal
        text = "HDL Cholesterol: 65 mg/dL"
        results = extract_parameters(text)
        hdl = next((r for r in results if r['parameter'] == 'HDL Cholesterol'), None)
        self.assertEqual(hdl['status'], 'optimal')

    def test_varied_formats(self):
        # Test different ways labs might write "Hemoglobin"
        text1 = "Hemoglobin: 13.5 g/dL"
        text2 = "Hb : 13.5"
        
        res1 = extract_parameters(text1)
        res2 = extract_parameters(text2)
        
        hb1 = next((r for r in res1 if r['parameter'] == 'Hemoglobin'), None)
        hb2 = next((r for r in res2 if r['parameter'] == 'Hemoglobin'), None)
        
        self.assertEqual(hb1['value'], 13.5)
        self.assertEqual(hb2['value'], 13.5)

    def test_kidney_liver_panel(self):
        text = """
        Serum Creatinine  0.9 mg/dL
        AST (SGOT)        25 U/L
        ALT (SGPT)        30 U/L
        Vitamin B12       400 pg/mL
        """
        results = extract_parameters(text)
        
        creatinine = next((r for r in results if r['parameter'] == 'Serum Creatinine'), None)
        ast = next((r for r in results if r['parameter'] == 'AST (SGOT)'), None)
        b12 = next((r for r in results if r['parameter'] == 'Vitamin B12'), None)
        
        self.assertEqual(creatinine['value'], 0.9)
        self.assertEqual(ast['value'], 25.0)
        self.assertEqual(b12['value'], 400.0)

if __name__ == '__main__':
    unittest.main()
