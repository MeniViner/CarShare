import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Invitation from '../components/Invitation';

i18n.use(initReactI18next).init({
  resources: {
    he: {
      translation: {

        //loading 
        "please wait": "אנא המתן",
        "Loading Data": "טוען נתונים",

        //settings page
        "set-language": "בחר שפה",
        "map-color": "צבעי המפה",

        "hello": "שלום",
        "welcome": "ברוך הבא, משתמש",
        "settings": "הגדרות",
        "new-user": "היי משתמש חדש",
        "info-lang": "אנא שקול להתחבר לחשבונך בכדי לשמר הגדרה זו לעתיד",
        "lang-saved": "השפה נשמרה לפיירבייס",
        "full-name": "שם מלא",
        "email-address": "כתובת מייל",
        "strong-password": "סיסמה חזקה",


        //info window
        "not available": "לא זמין",
        "car not available for selected dates and times": "הרכב אינו זמין לתאריכים ולשעות שנבחרו",
        "step 1": "שלב 1",
        "step 2": "שלב 2",
        "step 3": "שלב 3",
        "confirm order": "אשר הזמנה",
        "more details": "פרטים נוספים",
        "less details": "פחות פרטים",

        //invitation
        "total cost": "סה\"כ",
        "total hours": "סה\"כ שעות",
        "total days": "סה\"כ ימים",
        "daily": "יומי",
        "hourly": "שעתי",
        "start": "התחלה",
        "end": "סיום",
        "check availability": "בדוק זמינות",

        //AdditionalCharges
        "non return to original station": "אי החזרת רכב לתחנה ממנה נלקח",
        "within one minute walk": "עד דקה הליכה: ללא חיוב",
        "more than one minute up to 500 meters": "יותר מדקה הליכה ועד למרחק 500 מטר: 250 ₪*",
        "beyond that": "מעבר לזה:",
        "per km": "לק\"מ",
        "late return": "איחור בהחזרת רכב",
        "up to 10 minutes": "עד 10 דקות איחור:",
        "per minute": "לכל דקה",
        "more than 10 minutes": "מעל 10 דקות איחור:",
        "per minute late": "לכל דקת איחור",
        "must inform call center": "חובה לעדכן את המוקד הטלפוני על כל איחור! בלי קשר לתשלום",
        "reservation cancellation": "ביטול הזמנה",
        "up to 2 hours before": "עד שעתיים לפני מועד ההשכרה: ללא עלות",
        "less than 2 hours before": "פחות משעתיים לפני מועד ההשכרה: חיוב מלא",
        "50% of the reservation amount": "50% מסכום ההזמנה יחול מתחילת מועד ההשכרה: חיוב מלא על סכום ההזמנה",
      
        //PriceList
        "price list updated": "המחירון נכון לזמן זה ומתעדכן מעת לעת",
        "small E": "קטן E",
        "5 seats": "5 מקומות",
        "Nissan Micra": "ניסאן מיקרה",
        "hourly": "שעתי",
        "per hour": "לשעה",
        "per km": "לכל ק\"מ",
        "daily": "יומי",
        "per day": "ליום",
        "small G": "קטן G",
        "Peugeot 208": "פיגו 208",
      
      
        //Prices
        "prices": "מחירון",
        "price list": "רשימת מחירים",
        "additional charges": "חיובים נוספים",

        //EditProfile
        "delete my account": "מחק את החשבון שלי",

        "edit your personal info": "ערוך את המידע האישי שלך",
        "profile": "פרופיל",
        "upload profile image": "העלה תמונת פרופיל",
        "first name": "שם פרטי",
        "last name": "שם משפחה",
        "date of birth": "תאריך לידה",
        "phone number": "מספר טלפון",
        "address": "כתובת",
        "driving license": "רישיון נהיגה",
        "payment method": "אמצעי תשלום",
        "save changes": "שמור שינויים",
        "success": "הצלחה",
        "information updated": "המידע שלך עודכן.",
        "error": "שגיאה",
        "failed to update information": "עדכון המידע נכשל.",


        // EmailLogin
        "or login by email": "או התחבר באמצעות מייל",
        "login": "התחבר",
        "register": "הרשם",
        "full name": "שם מלא",
        "email address": "כתובת מייל",
        "strong password": "סיסמא חזקה",
        "forgot password": "שכחת סיסמא",
        "need an account? register here": "צריך חשבון? הרשם כאן",
        "already have an account? Sign in here": "יש לך חשבון? התחבר כאן",
        "reset password": "איפוס סיסמא",
        "enter your email": "הכנס את כתובת המייל שלך",
        "send reset email": "שלח מייל לאיפוס",
        "back to login": "חזור להתחברות",
        "success": "הצלחה",
        "logged in successfully": "התחברת בהצלחה",
        "registered successfully": "נרשמת בהצלחה",
        "error": "שגיאה",
        "email already in use": "כתובת המייל כבר בשימוש. אנא התחבר במקום.",
        "invalid credential": "לא הצלחנו לזהות אותך. נסה להרשם במקום",
        "A password reset email will be sent to the provided email address if it exists": "אם כתובת המייל קיימת, נשלח מייל לאיפוס",
      

        // OrderView
        "time conflict": "התנגשות בזמנים",
        "car already reserved": "הרכב כבר הוזמן בתאריכים ובשעות שנבחרו",
        "order confirmed": "הזמנה אושרה",
        "car reserved successfully": "הרכב הוזמן בהצלחה!",
        "order details for": "פרטי הזמנה עבור",
        "from": "מתאריך",
        "at": "בשעה",
        "until": "עד תאריך",
        "so, you have": "אז, יש לך",
        "days and": "ימים ו",
        "hours": "שעות",
        "and your total cost will be": "והעלות הכוללת שלך תהיה",
        "order now": "הזמן עכשיו",

        
      }
    }
  },
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false
  }
});

export default i18n;