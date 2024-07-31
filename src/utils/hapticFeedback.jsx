export const triggerHapticFeedback = () => {
    if (navigator.vibrate) {
      navigator.vibrate(20); // Vibrate for 20ms
    }
  };
  