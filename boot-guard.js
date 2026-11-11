/* Moira açılış koruması (klasik betik; satır içi değil → katı CSP ile uyumlu).
 * Ana uygulama betiği yüklenemez ya da ayrıştırılamazsa (desteklenmeyen eski Safari: derleme hedefi Safari/iOS 16.4; bozuk önbellek; yarım indirme)
 * 1.0.0'da açılış ekranı sonsuza dek kalıyordu ve Ana Ekran uygulamasında yenileme düğmesi olmadığından kullanıcı ne olduğunu göremiyordu.
 * Bu betik yalnızca uygulama HİÇ başlamadıysa (window.__moiraReady ayarlanmadıysa) bir açıklama ve "Yeniden dene" düğmesi gösterir. Veriye dokunmaz. */
(function () {
  var shown = false;
  function show(detail) {
    if (shown || window.__moiraReady) return; shown = true;
    var sp = document.getElementById('splash'); if (!sp) return;
    var box = document.createElement('div');
    box.setAttribute('role', 'alert'); box.id = 'boot-error';
    box.style.cssText = 'max-width:320px;padding:0 24px;text-align:center;font:15px/1.45 -apple-system,system-ui,sans-serif';
    var p = document.createElement('p'); p.textContent = 'Moira açılamadı. iPhone / iPad için iOS 16.4 veya üzeri gerekir. İnternete bağlıyken yeniden denemek sorunu çözebilir. Kayıtların cihazında durur.';
    var s = document.createElement('p'); s.style.cssText = 'opacity:.6;font-size:12px;overflow-wrap:anywhere'; s.textContent = detail ? String(detail).slice(0, 200) : '';
    var b = document.createElement('button'); b.type = 'button'; b.textContent = 'Yeniden dene';
    b.style.cssText = 'font:600 16px -apple-system,system-ui,sans-serif;min-height:48px;padding:0 22px;border-radius:14px;border:0;background:#d9a3a8;color:#1a0f26';
    b.onclick = function () { window.location.reload(); };
    box.appendChild(p); box.appendChild(s); box.appendChild(b); sp.appendChild(box);
  }
  // Betik ayrıştırma/yükleme hataları (yakalama aşamasında: <script> öğesinin 'error' olayı kabarcıklanmaz)
  window.addEventListener('error', function (e) {
    var t = e && e.target; var isScript = t && t.tagName === 'SCRIPT';
    if (isScript) show('betik yüklenemedi: ' + (t.src || '')); else if (e && e.message && !window.__moiraReady) show(e.message);
  }, true);
  window.addEventListener('unhandledrejection', function (e) { if (!window.__moiraReady) show(e && e.reason && (e.reason.message || e.reason)); });
})();
