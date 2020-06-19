export function toast(message, duration = 1000) {
  const toast = document.createElement("ion-toast");
  toast.message = message;
  toast.duration = duration;
  toast.color = "dark";

  document.body.appendChild(toast);
  return toast.present();
}
