# horse racing GAME

bu proje vue 3 kullanılarak gelistirilmiş basit bir at yarisi uygulamasidir  
amac state yönetimi component yapisi ve temiz kod yapısını gostermekdir

---

## kullanilan TEKNOLOJILER

- vue 3
- vite
- typescript
- VUEX
- vitest

---

## Proje amaci

bu uygulamada gercek bir yaris simulasyonuna benzetmeye çalıştım   
burdaki asil amac asagidaki seyleri gostermektir

- canli yaris animasyonu
- state akisi nin dogru yonetilmesi
- okunabilir sade bir kod yapisi
- ileride degisiklik yapilabilmesi

---

##  nasil calisir

1. generate tusuna basildiginda  
   - 20 tane at olusturulur
   - her atin rengi farklidir ve condition degeri vardir
   - 6 round luk bir yaris plani hazirlanir

2. start tusuna basildiginda  
   - yaris round round baslar
   - her round da 10 at kosar
   - atlar ekranda canli sekilde ilerler
   - round bitince sonuc kayit edilir

3. reset tusu  
   - yaris durdurulur
   - tum bilgiler sifirlanir

---

## race engine aciklamasi

- her atin 1 ile 100 arasinda condition degeri vardir
- condition at in hizini belirler
- her kucuk zaman araliginda
