from deep_translator import GoogleTranslator

def translate_text(text, target_language):
    """
    Translate text to target language
    Supported: hi (Hindi), kn (Kannada), te (Telugu), ta (Tamil), ml (Malayalam)
    """
    try:
        translation = GoogleTranslator(source='auto', target=target_language).translate(text)
        return translation
    except:
        return text  # Return original if translation fails

def get_language_name(code):
    languages = {
        'en': 'English',
        'hi': 'हिंदी',
        'kn': 'ಕನ್ನಡ',
        'te': 'తెలుగు',
        'ta': 'தமிழ்',
        'ml': 'മലയാളം'
    }
    return languages.get(code, 'English')
