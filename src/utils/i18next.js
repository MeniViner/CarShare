import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    he: {
      translation: {

        //loading 
        "please wait": "אנא המתן",
        "Loading Data": "טוען נתונים",

        //settings page
        "set language": "בחר שפה",
        "map color": "צבעי המפה",

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
        "total hours": "סה\"כ שעות",
        "total days": "סה\"כ ימים",
        "start": "התחלה",
        "end": "סיום",
        "check availability": "בדוק זמינות",
        "go back": "חזור אחורה",

        //AdditionalCharges
        "non return to original station": "אי החזרת רכב לתחנה ממנה נלקח",
        "within one minute walk": "עד דקה הליכה: ללא חיוב",
        "more than one minute up to 500 meters": "יותר מדקה הליכה ועד למרחק 500 מטר: 250 ₪*",
        "beyond that": "מעבר לזה:",
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
        "driving license": "רישיון נהיגה",
        "payment method": "אמצעי תשלום",
        "save changes": "שמור שינויים",
        "firstName": "שם פרטי",
        "lastName": "שם משפחה",
        "phoneNumber": "מספר טלפון",
        "drivingLicense": "רישיון נהיגה",
        "paymentMethod": "אמצעי תשלום",
      

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
        "logged in successfully": "התחברת בהצלחה",
        "registered successfully": "נרשמת בהצלחה",
        "email already in use": "כתובת המייל כבר בשימוש. אנא התחבר במקום.",
        "invalid credential": "לא הצלחנו לזהות אותך. נסה להרשם במקום",
        "A password reset email will be sent to the provided email address if it exists": "אם כתובת המייל קיימת, נשלח מייל לאיפוס",
      

        // OrderView
        "time conflict": "התנגשות בזמנים",
        "car already reserved": "הרכב כבר הוזמן בתאריכים ובשעות שנבחרו",
        "car reserved successfully": "הרכב הוזמן בהצלחה!",
        "order details for": "פרטי הזמנה עבור",
        "from": "מתאריך",
        "at": "בשעה",
        "until": "עד תאריך",
        "so, you have": "אז, יש לך",
        "days and": "ימים ו",
        "and your total cost will be": "והעלות הכוללת שלך תהיה",
        "order now": "הזמן עכשיו",
        "duration": "משך",
        "and": "ו",
        "unlock fee": "דמי פתיחה",
        "order confirmed": "ההזמנה אושרה",
        

        //reservations
        "active reservations": "הזמנות פעילות",
        "reservation history": "היסטוריית הזמנות",
        "are you sure": "האם אתה בטוח?",
        "cannot undo action": "לא תוכל לבטל פעולה זו!",
        "yes cancel reservation": "כן, בטל הזמנה!",
        "cancel": "ביטול",
        "cancelled": "בוטל!",
        "reservation cancelled": "ההזמנה שלך בוטלה.",
        "delete all history warning": "פעולה זו תמחק את כל היסטוריית ההזמנות!",
        "yes delete all": "כן, מחק הכל!",
        "deleted": "נמחק!",
        "reservation history deleted": "היסטוריית ההזמנות נמחקה.",
        "from date": "מתאריך",
        "to date": "עד תאריך",
        "at time": "בשעה",
        "hours": "שעות",
        "days": "ימים",
        "total cost": "סה\"כ עלות",
        "cancel reservation": "בטל הזמנה",
        "delete from history": "מחק מההיסטוריה",
        "no active reservations": "אין הזמנות פעילות כרגע",
        "when you have active reservation": "ברגע שיהיה לך הזמנה פעילה",
        "it will appear here": "היא תופיע פה",
        "reserve now": "הזמן עכשיו",
        "reservation history empty": "היסטוריית ההזמנות שלך ריקה",
        "past rented cars appear here": "רכבים שהשכרת בעבר יופיעו פה",
        "delete all history": "מחק את כל ההיסטוריה",
        "rental cost": "עלות זמן ההשכרה",


        //SideNavigation
        "main navigation": "ניווט ראשי",
        "search": "חיפוש",
        "map": "מפה",
        "saved": "שמורים",
        "reservation": "הזמנות",
        "contact": "צור קשר",
        "user avatar": "תמונת משתמש",
        "guest avatar": "תמונת אורח",
        "hi guest": "שלום אורח",
        "log in here": "התחבר כאן",
        "close menu": "סגור תפריט",
        "open menu": "פתח תפריט",

        //profile and related
        "or": "או",
        "logout": "התנתק",
        "logout confirmation title": "האם אתה בטוח?",
        "logout confirmation text": "אתה תתנתק מהחשבון שלך.",
        "logged out": "התנתקת",
        "logged out success": "התנתקת בהצלחה.",
        "user profile": "פרופיל משתמש",
        "email": "אימייל",
        "address": "כתובת",
        "change profile picture": "שנה תמונת פרופיל",
        "change profile picture confirmation": "האם אתה רוצה לשנות את תמונת הפרופיל שלך?",
        "yes change it": "כן, שנה אותה!",
        "changed": "שונה!",
        "profile picture updated": "תמונת הפרופיל שלך עודכנה.",
        "success": "בוצע",
        "information updated": "המידע שלך עודכן.",
        "error": "שגיאה",
        "failed to update information": "נכשל בעדכון המידע שלך.",


        //Saved
          "You're not connected": "אתה לא מחובר",
          "Connect with your account to access and manage your saved items seamlessly.": "התחבר לחשבונך כדי לגשת ולנהל את הפריטים השמורים שלך בצורה חלקה.",
          "Stay connected and never lose track of your preferences and saved content.": "הישאר מחובר ולעולם אל תאבד את ההעדפות והתוכן השמור שלך.",
          "Sign in now": "התחבר עכשיו",
          "Nothing here yet": "אין כאן כלום עדיין",
          "You haven't saved anything yet.": "עדיין לא שמרת כלום.",
          "Start adding some items and they will show up here!": "התחל להוסיף פריטים והם יופיעו כאן!",
          "Explore Cars": "גלה מכוניות",
          "your garage": "המוסך שלך",
          "{{price}} ₪/day": "{{price}} ₪/יום",
          "Please log in": "אנא התחבר",
          "To remove cars, please log in.": "כדי להסיר מכוניות, אנא התחבר.",
          "Removed": "הוסר",
          "Car removed successfully!": "המכונית הוסרה בהצלחה!",
          "Failed to remove car.": "הסרת המכונית נכשלה.",

          //ListCars
            "Nearby": "בקרבתך",
            "Category": "קטגוריה",
            "Seats": "מושבים",
            "Year": "שנה",
            "Fuel Type": "סוג דלק",
            "Battery": "סוללה",
            "{{brand}} {{model}}": "{{brand}} {{model}}",
            "Hybrid": "היברידי",
            "{{brand}} {{model}} {{year}}": "{{brand}} {{model}} {{year}}",
            "{{distance}} km": "{{distance}} ק\"מ",
            "{{distance}} meter": "{{distance}} מטר",
            "{{price}} ₪/hour": "{{price}} ₪/שעה",
            "{{seats}} seats": "{{seats}} מושבים",
            "Please log in to save cars.": "אנא התחבר כדי לשמור מכוניות.",
            "Car removed from saved list.": "המכונית הוסרה מרשימת השמורים.",
            "Car saved successfully!": "המכונית נשמרה בהצלחה!",
            "Failed to update car save status.": "עדכון סטטוס שמירת המכונית נכשל.",
            "Failed to load cars. Please try again.": "טעינת המכוניות נכשלה. אנא נסה שוב.",
        

            // SearchResults
            "search results": "תוצאות חיפוש",
            "found results": "נמצאו {{count}} תוצאות עבור: {{query}}",
            "no results found": "לא נמצאו תוצאות",
            "map page content": "תוכן דף המפה",
            "profile page content": "תוכן דף הפרופיל",
            "car list": "רשימת רכבים",
            "car list page content": "תוכן דף רשימת הרכבים",
            "saved cars and preferences": "רכבים והעדפות שמורים",
            "settings page content": "תוכן דף ההגדרות",
            "view and manage your reservations": "צפייה וניהול ההזמנות שלך",
            "contact information and support": "פרטי התקשרות ותמיכה",
            "prices": "מחירים",
            "pricing information for car rentals": "מידע על מחירי השכרת רכב",
            "car": "רכב",


            // TermsOfUse
            "terms of use": "תנאי שימוש",
            "1. acceptance of terms": "1. קבלת התנאים",
            "by accessing and using the car manager app, you agree to be bound by these terms of use": "על ידי גישה ושימוש באפליקציית ניהול הרכב, אתה מסכים להיות מחויב לתנאי שימוש אלה",
            "2. user registration": "2. רישום משתמש",
            "you must register for an account to use certain features of the app": "עליך להירשם לחשבון כדי להשתמש בתכונות מסוימות של האפליקציה",
            "3. car rental terms": "3. תנאי השכרת רכב",
            "all car rentals are subject to availability and our rental agreement": "כל השכרות הרכב כפופות לזמינות ולהסכם ההשכרה שלנו",
            "4. payment and fees": "4. תשלום ועמלות",
            "you agree to pay all fees associated with your use of the app and car rentals": "אתה מסכים לשלם את כל העמלות הקשורות לשימוש שלך באפליקציה ובהשכרות רכב",
            "5. user responsibilities": "5. אחריות המשתמש",
            "you are responsible for maintaining the confidentiality of your account": "אתה אחראי לשמור על סודיות החשבון שלך",
            "6. prohibited activities": "6. פעילויות אסורות",
            "you may not use the app for any illegal or unauthorized purpose": "אינך רשאי להשתמש באפליקציה למטרות בלתי חוקיות או בלתי מורשות",
            "7. privacy policy": "7. מדיניות פרטיות",
            "your use of the app is also governed by our privacy policy": "השימוש שלך באפליקציה מוסדר גם על ידי מדיניות הפרטיות שלנו",
            "8. modifications to service": "8. שינויים בשירות",
            "we reserve the right to modify or discontinue the app at any time": "אנו שומרים לעצמנו את הזכות לשנות או להפסיק את האפליקציה בכל עת",
            "9. limitation of liability": "9. הגבלת אחריות",
            "we are not liable for any indirect, incidental, or consequential damages": "איננו אחראים לנזקים עקיפים, מקריים או תוצאתיים כלשהם",
            "10. governing law": "10. חוק שולט",
            "these terms are governed by the laws of the state/country where the app operates": "תנאים אלה מוסדרים על ידי חוקי המדינה/ארץ בה פועלת האפליקציה",


          // CONTACTUS
          "contact us": "צור איתנו קשר",
          "your name": "שמך",
          "your email": "כתובת המייל לחזרה",
          "your phone": "מספר הטלפון ליצירת קשר",
          "your message": "הודעה מפורטת עם פרטי הפנייה",
          "send message": "שלח את פנייתך",


          // שונות
          "manage page": "פאנל ניהול",
          "Price p-km": "מחיר לק\"מ",
          "page": "דף תוכן",
          "setting": "הגדרה",
          "day": "יום",
          "category": "קטגוריה",
          "location": "מיקום",
          "user not authenticated": "משתמש לא מחובר",
          "Please log in to use the search feature.": "נא התחבר כדי להשתמש בתכונת החיפוש..",
          "you already have a reservation for this car on this date": "כבר יש לך הזמנה לרכב זה בתאריך זה",
          "go to reservation": "צפה בהזמנה",
          "Manager panel": "פאנל ניהול",
          "Scroll horizontally to see more": "גלול לרוחב כדי לראות עוד",
          "invalid booking date": "תאריך הזמנה לא תקין",
          "cannot book for past dates": "לא ניתן להזמין לתאריכים מהעבר",
          "please select a future date for vehicle reservation": "אנא בחר תאריך עתידי להזמנת רכב",
          "The reservation must be for at least 1 hour.": "ההזמנה חייבת להיות למשך שעה אחת לפחות.",
          "connect now": "התחבר כעת",
          "login with google": "התחבר באמצעות גוגל",
          "need an account?": "צריך חשבון?",
          "register here": "הירשם כאן",
          "already have an account?": "כבר יש לך חשבון?",
          "Sign in here": "התחבר כאן",
        
      }
    }
  },
  lng: "he",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false
  }
});

export default i18n;
