import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TreeDeciduous, Apple, Flower2, BookOpen, Sprout, FlaskConical, Leaf, Camera } from "lucide-react";

const Activities = () => {
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [activeDetailTab, setActiveDetailTab] = useState("agac-dikimi");

  const detailedActivities = [
    { key: "tanisma-toplantisi", title: "Tanışma Toplantısı" },
    { key: "sakli-bahce", title: "Saklı Bahçedeyiz" },
    { key: "agac-dikimi", title: "Ağaç Dikimi" },
    { key: "kus-cenneti", title: "Kuş Cenneti Gezisi" },
    { key: "orman-banyosu", title: "Orman Banyosu ve Ağaç Terapisi" },
    { key: "herbaryum", title: "Herbaryum Hazırlama" },
    { key: "meyve-sebze", title: "Meyve ve Sebze Toplama" },
    { key: "ata-tohumu", title: "Ata Tohumları Devir Teslim Töreni" }
  ];

  const activities = [
    {
      week: 1,
      icon: Flower2,
      title: "Tanışma Toplantısı",
      description: "Bahçecilik temel bilgileri, araç-gereç tanıtımı ve güvenli çalışma prensipleri"
    },
    {
      week: 2,
      icon: FlaskConical,
      title: "Saklı Bahçedeyiz",
      description: "Bahçe terapisi faaliyetleri, duyu deneyimleri ve rahatlama çalışmaları"
    },
    {
      week: 3,
      icon: Sprout,
      title: "Ağaç Dikimi",
      description: "Kuşaklar arası fidan dikimi, ekopsikoloji odaklı doğa deneyimi"
    },
    {
      week: 4,
      icon: TreeDeciduous,
      title: "Kuş Cenneti Gezisi",
      description: "Doğa gözlemi, müze ziyareti ve bilgilendirme sunumuyla kuş çeşitliliği"
    },
    {
      week: 5,
      icon: Apple,
      title: "Orman Banyosu ve Ağaç Terapisi",
      description: "Duyusal farkındalık, stres azaltma ve kuşaklar arası etkileşim"
    },
    {
      week: 6,
      icon: BookOpen,
      title: "Herbaryum Hazırlama",
      description: "Bitki toplama, kurutma ve kuşaklar arası koleksiyon çalışması"
    },
    {
      week: 7,
      icon: Leaf,
      title: "Meyve ve Sebze Toplama",
      description: "Meyve ve sebze toplama"
    },
    {
      week: 8,
      icon: Camera,
      title: "Ata Tohumları Devir Teslim Töreni",
      description: "Deneyimlerin paylaşılması, fotoğraf sergisi ve sertifika töreni"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Faaliyetler
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ekopsikolojik Yaklaşımla Oluşturulmuş Doğa Temelli Etkinlikler
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity) => {
            const Icon = activity.icon;
            const isDetailActivity = detailedActivities.some((item) => item.title === activity.title);
            return (
              <Card
                key={activity.week}
                className={`group hover:border-primary transition-all shadow-soft hover:shadow-strong ${
                  isDetailActivity ? "cursor-pointer" : ""
                }`}
                onClick={
                  isDetailActivity
                    ? () => {
                        const matched = detailedActivities.find((item) => item.title === activity.title);
                        if (matched) setActiveDetailTab(matched.key);
                        setIsDetailDialogOpen(true);
                      }
                    : undefined
                }
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div />
                    <div className="p-2 bg-accent/20 rounded-lg group-hover:bg-accent/30 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-base md:text-lg leading-snug text-center">{activity.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{activity.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Detaylı Faaliyetler Sekme Diyaloğu */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-5xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detaylı Faaliyet Planları</DialogTitle>
            <DialogDescription>Her etkinlik için amaç, öğrenme çıktıları ve akış.</DialogDescription>
          </DialogHeader>

          <Tabs value={activeDetailTab} onValueChange={setActiveDetailTab} className="mt-4">
            <TabsList className="flex flex-wrap md:flex-nowrap overflow-x-auto gap-2">
              {detailedActivities.map((item) => (
                <TabsTrigger
                  key={item.key}
                  value={item.key}
                  className="text-[10px] md:text-[11px] lg:text-xs leading-snug text-center px-2 py-2 whitespace-nowrap"
                >
                  {item.title}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="tanisma-toplantisi" className="space-y-4 text-sm md:text-base leading-relaxed">
              <h3 className="text-base md:text-lg font-semibold text-center leading-snug">
                Tanışma Toplantısı
              </h3>
              <div className="space-y-2">
                <p className="font-semibold">Bu oturumda gerçekleştirilenler:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Tüm katılımcılara projenin tanıtımı yapıldı.</li>
                  <li>Ekopsikolojik yaklaşımın öneminden bahsedildi.</li>
                  <li>Proje sürecinde gerçekleştirilecek faaliyet planı açıklandı.</li>
                  <li>
                    Projenin web sitesinin ayrıntıları ve dijital uygulamanın nasıl kullanılacağı
                    katılımcı grupla paylaşıldı.
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="sakli-bahce" className="space-y-4 text-sm md:text-base leading-relaxed">
              <h3 className="text-base md:text-lg font-semibold text-center leading-snug">
                Saklı Bahçedeyiz (Süs Bitkileri) ve Kokulu–Dokulu Bitkiler Atölyesi
              </h3>
              <div className="space-y-6">
                <section className="space-y-2">
                  <h4 className="text-sm md:text-base font-semibold text-center leading-snug">
                    1. Etkinlik: Saklı Bahçedeyiz (Süs Bitkileri)
                  </h4>
                  <p>
                    <span className="font-semibold">Etkinliğin Adı: </span>
                    Saklı Bahçedeyiz (Süs Bitkileri)
                  </p>
                  <p>
                    <span className="font-semibold">Amaç: </span>
                    Yaşlı bireyler ile lise öğrencilerini doğa temelli bir etkinlik etrafında bir araya getirerek kuşaklar
                    arası etkileşimi güçlendirmek, ekopsikolojik yaklaşımla doğayla bağ kurmalarını desteklemek ve çevreye
                    yönelik duyarlılıklarını artırmak.
                  </p>
                  <p>
                    <span className="font-semibold">Hedef Grup: </span>
                    Deney Grubu lise öğrencileri ve yaşlı bireyler (ikili veya küçük grup eşleştirmesi yapılacaktır).
                  </p>
                  <div>
                    <p className="font-semibold">Öğrenme Çıktıları:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Bitki bakımıyla ilgili temel bilgi ve beceri kazanımı.</li>
                      <li>Çevre ve doğa duyarlılığının artması.</li>
                      <li>Kuşaklar arası iletişim ve iş birliği becerisinin gelişmesi.</li>
                      <li>Yaşlılarda psikolojik iyi oluşa katkı sağlaması.</li>
                      <li>Öğrencilerde yaşlı bireylere yönelik olumlu tutumların artması.</li>
                    </ul>
                  </div>
                  <p>
                    <span className="font-semibold">Süre: </span>
                    60–75 dakika
                  </p>
                  <p>
                    <span className="font-semibold">Etkinlik Alanı: </span>
                    Saklı Bahçe
                  </p>
                  <p>
                    <span className="font-semibold">Gerekli Materyaller: </span>
                    Süs bitkisi fideleri/tohumları, saksılar, toprak/torf, el kürekleri, eldiven, sprey şişesi, etiket
                    kartları, kalem, masa örtüsü, bitki bakım çizelgesi.
                  </p>
                  <div>
                    <p className="font-semibold mt-3">Etkinlik Akışı:</p>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>
                        <span className="font-semibold">A. Tanışma ve Isınma (10 dakika)</span>
                        <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                          <li>Katılımcılar kısa bir tanışma turu yapar.</li>
                          <li>“Doğayla ilişkim…” temalı kısa bir paylaşım yapılır.</li>
                          <li>Lise öğrencileri ile yaşlı bireyler ikili veya küçük gruplar hâlinde eşleştirilir.</li>
                        </ul>
                      </li>
                      <li>
                        <span className="font-semibold">B. Ekopsikolojik Yaklaşıma Giriş (5 dakika)</span>
                        <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                          <li>Doğada bulunmanın duygusal ve zihinsel etkileri hakkında kısa bir bilgilendirme yapılır.</li>
                          <li>Bitki yetiştirmenin insan psikolojisine katkıları anlatılır.</li>
                        </ul>
                      </li>
                      <li>
                        <span className="font-semibold">C. Süs Bitkisi Ekimi Uygulaması (25–30 dakika)</span>
                        <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                          <li>Eşleşen gruplar saksılarına toprak doldurur.</li>
                          <li>Yaşlı bireyler bitki yetiştirme deneyimlerini öğrencilerle paylaşır.</li>
                          <li>
                            Öğrenciler saksı etiketi hazırlama, bitkinin düzgün yerleştirilmesi ve sulama kontrolü gibi
                            adımlarda destek olur.
                          </li>
                          <li>Her grup kendi bitkisini eker.</li>
                          <li>Bitki bakım çizelgesi birlikte hazırlanır (sulama günleri, güneş ihtiyacı vb.).</li>
                        </ul>
                      </li>
                      <li>
                        <span className="font-semibold">D. Duyuşsal Farkındalık Çalışması (10 dakika)</span>
                        <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                          <li>
                            Her katılımcı “Bu bitki bana ne hissettiriyor?” veya “Bu bitkiyi neden seçtim?” sorularını
                            yanıtlayan kısa bir not yazar.
                          </li>
                          <li>Grupta gönüllü olanlar notlarını paylaşır.</li>
                          <li>Kuşaklar arası bağın bitki aracılığıyla nasıl güçlendiği üzerine konuşulur.</li>
                        </ul>
                      </li>
                      <li>
                        <span className="font-semibold">E. Kapanış ve Değerlendirme (5 dakika)</span>
                        <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                          <li>Katılımcılar etkinlikten edindikleri duyguları ve deneyimleri paylaşır.</li>
                          <li>Bitkinin bakımının kim tarafından nasıl sürdürüleceği planlanır.</li>
                          <li>Kısa bir sözlü geri bildirim alınır.</li>
                        </ul>
                      </li>
                    </ol>
                  </div>
                  <p className="mt-2">
                    <span className="font-semibold">Değerlendirme: </span>
                    1–2 gün sonra dijital uygulama aracılığıyla bitki durum değerlendirmesi.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-sm md:text-base font-semibold text-center leading-snug">
                    2. Etkinlik: Kokulu–Dokulu Bitkiler: Saklı Bahçe Atölye Çalışması
                  </h4>
                  <p>
                    <span className="font-semibold">Etkinliğin Adı: </span>
                    Kokulu–Dokulu Bitkiler: Saklı Bahçe Atölye Çalışması
                  </p>
                  <p>
                    <span className="font-semibold">Amaç: </span>
                    Katılımcıların duyusal farkındalıklarını artırmak, dokunsal ve kokusal bitkiler aracılığıyla doğa ile
                    bağ kurmalarını sağlamak, kuşaklar arası etkileşimi güçlendirmek ve ekopsikolojik yaklaşımla psikolojik
                    iyi oluşu desteklemek.
                  </p>
                  <p>
                    <span className="font-semibold">Hedef Grup: </span>
                    Lise öğrencileri ve yaşlı bireylerden oluşan deney grubu.
                  </p>
                  <div>
                    <p className="font-semibold">Öğrenme Çıktıları:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Koku ve doku duyularını ayırt etme becerisi.</li>
                      <li>Kokulu ve dokulu bitkileri tanıma.</li>
                      <li>Kuşaklar arası iletişim ve paylaşımın güçlenmesi.</li>
                      <li>Doğa temelli etkinliklerle duygusal rahatlama sağlama.</li>
                      <li>Bitki bakımı ve duyusal bahçe kavramlarına ilişkin temel bilgi edinme.</li>
                      <li>Birlikte üretme ve tasarlama deneyimi kazanma.</li>
                    </ul>
                  </div>
                  <p>
                    <span className="font-semibold">Süre: </span>
                    60–75 dakika
                  </p>
                  <p>
                    <span className="font-semibold">Etkinlik Alanı: </span>
                    Saklı Bahçe
                  </p>
                  <p>
                    <span className="font-semibold">Gerekli Materyaller: </span>
                    Lavanta, nane, biberiye, adaçayı gibi kokulu bitkiler; keçeli yapraklar, kaktüs, sukulent gibi dokulu
                    bitkiler; küçük saksılar; torf/toprak; etiket kartları; eldiven; el küreği; masa örtüsü; su şişesi /
                    spreyi.
                  </p>
                  <div>
                    <p className="font-semibold mt-3">Etkinlik Akışı:</p>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>
                        <span className="font-semibold">1. Karşılama ve Isınma (10 dk)</span>: Duyular üzerine kısa sohbet;
                        “Bana huzur veren bir koku/dokunma deneyimi” paylaşımı.
                      </li>
                      <li>
                        <span className="font-semibold">2. Bitkilerin Tanıtımı (5 dk)</span>: Kokulu ve dokulu bitkilerin
                        özellikleri, kullanım alanları ve ekopsikolojik etkilerinin açıklanması.
                      </li>
                      <li>
                        <span className="font-semibold">3. Saklı Bahçe Uygulaması (25–30 dk)</span>: Katılımcıların küçük
                        saksılara seçtikleri kokulu–dokulu bitkilerle kendi mini “saklı bahçelerini” oluşturması; yaşlı
                        bireylerin bitki bakımıyla ilgili deneyimlerini anlatması; öğrencilerin etiket ve düzenleme desteği
                        vermesi.
                      </li>
                      <li>
                        <span className="font-semibold">4. Duyusal Farkındalık (10 dk)</span>: Katılımcıların bitkilerin
                        kokularını ve dokularını inceleyerek hissettiklerini not etmeleri ve paylaşmaları.
                      </li>
                      <li>
                        <span className="font-semibold">5. Kapanış (5 dk)</span>: Bahçelerin fotoğrafının çekilmesi, bakım
                        sorumluluklarının belirlenmesi ve kısa bir değerlendirme.
                      </li>
                    </ol>
                  </div>
                  <p className="mt-2">
                    <span className="font-semibold">Değerlendirme: </span>
                    1 hafta sonra bitki durumu ve bakım takibinin dijital uygulama aracılığıyla gerçekleştirilmesi.
                  </p>
                </section>
              </div>
            </TabsContent>

            <TabsContent value="agac-dikimi" className="space-y-4 text-sm md:text-base leading-relaxed">
              <h3 className="text-base md:text-lg font-semibold text-center leading-snug">
                Birlikte Kök Salıyoruz: Kuşaklar Arası Fidan Dikimi
              </h3>
              <div className="grid md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                  <p>
                    <span className="font-semibold">Amaç: </span>
                    Yaşlı bireyler ile lise öğrencilerini doğa temelli bir etkinlikte buluşturarak kuşaklar arası
                    etkileşimi güçlendirmek, ekopsikolojik yaklaşımla doğaya yönelik olumlu tutum geliştirmek ve çevre
                    bilincini artırmak.
                  </p>
                  <p>
                    <span className="font-semibold">Hedef Grup: </span>
                    Deney Grubu lise öğrencileri ve yaşlı bireyler.
                  </p>
                  <div>
                    <p className="font-semibold">Öğrenme Çıktıları:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Fidan dikimi sürecine ilişkin temel bilgi edinme.</li>
                      <li>Doğa ve çevre duyarlılığının artması.</li>
                      <li>Kuşaklar arası iletişim ve iş birliğinin gelişmesi.</li>
                      <li>Yaşlı bireylerde psikolojik iyi oluşun desteklenmesi.</li>
                      <li>Öğrencilerin yaşlı bireylere yönelik olumlu tutum geliştirmesi.</li>
                      <li>Fidan bakımına yönelik sorumluluk bilinci oluşturma.</li>
                    </ul>
                  </div>
                  <p>
                    <span className="font-semibold">Süre: </span>
                    60–90 dakika
                  </p>
                  <p>
                    <span className="font-semibold">Etkinlik Alanı: </span>
                    Orman Genel Müdürlüğü Fidanlığı
                  </p>
                  <div>
                    <p className="font-semibold">Gerekli Materyaller:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Fidanlar (çam, meşe, ıhlamur vb.)</li>
                      <li>Toprak ve destek malzemesi</li>
                      <li>Kürek</li>
                      <li>Eldiven</li>
                      <li>Sulama kabı</li>
                      <li>Etiket çubukları</li>
                      <li>Fotoğraf için telefon/kamera</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold">Etkinlik Akışı:</p>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>Tanışma ve Isınma (10 dk): Kısa sohbet ve grup eşleşmeleri.</li>
                      <li>Ekopsikolojik Giriş (5 dk): Doğanın ruh hâline etkileri.</li>
                      <li>Fidan Dikimi (30–40 dk): Çukur açma, fidan yerleştirme, toprak kapama, can suyu verme.</li>
                      <li>Anlamlandırma (10 dk): Fidanlara isim verme ve duygu paylaşımı.</li>
                      <li>Kapanış (5 dk): Değerlendirme, bakım planı ve fotoğraf çekimi.</li>
                    </ol>
                  </div>
                  <p>
                    <span className="font-semibold">Değerlendirme: </span>
                    1 ay sonra dijital uygulama aracılığıyla fidan gelişimi takibi.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="kus-cenneti" className="space-y-4 text-sm md:text-base leading-relaxed">
              <h3 className="text-base md:text-lg font-semibold text-center leading-snug">
                Kuş Cenneti Doğa Gözlemi, Müze Ziyareti ve Bilgilendirme Sunumu
              </h3>
              <p>
                <span className="font-semibold">Amaç: </span>
                Katılımcıların kuş türlerini doğal yaşam alanlarında gözlemlemesini sağlamak, ekosistem ve biyolojik
                çeşitlilik farkındalığını artırmak; kuş cenneti müzesini ziyaret ederek bilgi düzeyini güçlendirmek ve
                sunum aracılığıyla öğrenilenleri pekiştirmek.
              </p>
              <p>
                <span className="font-semibold">Hedef Grup: </span>
                Lise öğrencileri ve yaşlı bireylerden oluşan deney grubu.
              </p>
              <div>
                <p className="font-semibold">Öğrenme Çıktıları:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Kuş gözlemi konusunda temel bilgi kazanma.</li>
                  <li>Biyolojik çeşitlilik ve ekosistem hakkında farkındalık geliştirme.</li>
                  <li>Kuş Cenneti ile ilgili koruma ve sürdürülebilirlik kavramlarını öğrenme.</li>
                  <li>Kuş türlerini tanıma ve sınıflandırma becerisi.</li>
                  <li>Kuş Cenneti Müzesi’nden edinilen bilgileri yorumlayabilme.</li>
                  <li>Sunum sırasında iletişim ve paylaşım becerileri geliştirme.</li>
                </ul>
              </div>
              <p>
                <span className="font-semibold">Süre: </span>
                90–120 dakika
              </p>
              <p>
                <span className="font-semibold">Etkinlik Alanı: </span>
                Kuş Cenneti doğal gözlem alanı, Kuş Cenneti Müzesi ve sunum salonu.
              </p>
              <div>
                <p className="font-semibold">Gerekli Materyaller:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Dürbünler</li>
                  <li>Kuş tanıma kılavuzu</li>
                  <li>Not defteri ve kalem</li>
                  <li>Fotoğraf makinesi / telefon</li>
                  <li>Müze bilgilendirme broşürleri</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Etkinlik Akışı:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Doğa Gözlemi (30–40 dk): Dürbün kullanımı ve kuş davranışlarının incelenmesi.</li>
                  <li>Müze Ziyareti (20–30 dk): Türler, göç yolları ve sulak alan ekosistemi.</li>
                  <li>
                    Bilgilendirme Sunumu (20–30 dk): Tarihçe, ekolojik önem, türler ve koruma çalışmaları üzerine uzman
                    sunumu.
                  </li>
                  <li>Değerlendirme (10 dk): Gözlem notlarının paylaşılması ve grup değerlendirmesi.</li>
                </ol>
              </div>
              <p>
                <span className="font-semibold">Değerlendirme: </span>
                Katılımcı sözlü geri bildirimleri, gözlem formu ve kısa değerlendirme formu; fotoğraflar ve notlar üzerinden
                etkinlik sonrası analiz.
              </p>
            </TabsContent>

            <TabsContent value="orman-banyosu" className="space-y-4 text-sm md:text-base leading-relaxed">
              <h3 className="text-base md:text-lg font-semibold text-center leading-snug">
                Ormanda Buluşuyoruz: Orman Banyosu ve Ağaç Terapisi Etkinliği
              </h3>
              <p>
                <span className="font-semibold">Amaç: </span>
                Katılımcıların orman ortamında duyusal farkındalık geliştirmelerini, doğa ile bağ kurmalarını, stres
                düzeylerini azaltmalarını ve kuşaklar arası etkileşimi güçlendirmelerini sağlamak.
              </p>
              <p>
                <span className="font-semibold">Hedef Grup: </span>
                Lise öğrencileri ve yaşlı bireylerden oluşan deney grubu.
              </p>
              <div>
                <p className="font-semibold">Öğrenme Çıktıları:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Orman banyosunun temel ilkelerini tanıma.</li>
                  <li>Ağaç terapisiyle duygusal rahatlama ve farkındalık geliştirme.</li>
                  <li>Doğada duyusal farkındalık becerilerinin artması.</li>
                  <li>Kuşaklar arası iletişim ve empati becerisinin gelişmesi.</li>
                  <li>Stres azaltma ve ruhsal iyilik hâlinde olumlu değişim.</li>
                  <li>Orman ekosistemine dair temel bilgi edinme.</li>
                </ul>
              </div>
              <p>
                <span className="font-semibold">Süre: </span>
                60–90 dakika
              </p>
              <p>
                <span className="font-semibold">Etkinlik Alanı: </span>
                Ormanlık alan ve doğal yürüyüş rotası.
              </p>
              <div>
                <p className="font-semibold">Gerekli Materyaller:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Doğa gözlem defteri</li>
                  <li>Kalem</li>
                  <li>Su matarası</li>
                  <li>Doğa rehberi</li>
                  <li>Rahat ayakkabı ve kıyafet</li>
                  <li>Fotoğraf makinesi / telefon</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Etkinlik Akışı:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Ormana Giriş – Yavaşlama (10 dk): Nefes egzersizi ve beden farkındalığı.</li>
                  <li>Duyusal Keşif (10–15 dk): Sesler, dokular ve yaprak gözlemi.</li>
                  <li>Ağaç Terapisi (20 dk): Ağaca temas, gövdeye yaslanma ve nefes uyumu ile meditasyon.</li>
                  <li>Doğa Günlüğü (10 dk): Hislerin kısa notlarla ifade edilmesi.</li>
                  <li>Paylaşım Çemberi (10 dk): Deneyimlerin sözlü paylaşımı.</li>
                  <li>Kapanış (5 dk): Ormana teşekkür ritüeli ve kısa değerlendirme.</li>
                </ol>
              </div>
              <p>
                <span className="font-semibold">Değerlendirme: </span>
                Gözlem formu, yansıtıcı günlük ve sözlü geri bildirim çemberi.
              </p>
            </TabsContent>

            <TabsContent value="herbaryum" className="space-y-4 text-sm md:text-base leading-relaxed">
              <h3 className="text-base md:text-lg font-semibold text-center leading-snug">
                Herbaryum (Bitki Kurutma ve Koleksiyon) Atölyesi
              </h3>
              <p>
                <span className="font-semibold">Amaç: </span>
                Katılımcıların bitki türlerini tanımasını, kurutma–presleme tekniklerini uygulamasını ve kuşaklar arası
                etkileşim ile doğaya yönelik farkındalık geliştirmesini sağlamak.
              </p>
              <p>
                <span className="font-semibold">Hedef Grup: </span>
                Lise öğrencileri ve yaşlı bireylerden oluşan deney grubu.
              </p>
              <div>
                <p className="font-semibold">Öğrenme Çıktıları:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Bitki toplama ve presleme yöntemlerini öğrenme.</li>
                  <li>Bitki türlerini ayırt etme becerisi kazanma.</li>
                  <li>Doğa gözlemi ve sürdürülebilir toplama bilinci geliştirme.</li>
                  <li>Kuşaklar arası iletişim ve ortak üretim deneyimi.</li>
                  <li>Herbaryum yaprağı hazırlama sürecini uygulayabilme.</li>
                  <li>Duyusal ve bilişsel farkındalık geliştirme.</li>
                </ul>
              </div>
              <p>
                <span className="font-semibold">Süre: </span>
                60–90 dakika
              </p>
              <p>
                <span className="font-semibold">Etkinlik Alanı: </span>
                Orman veya atölye sınıfı.
              </p>
              <div>
                <p className="font-semibold">Gerekli Materyaller:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Bitki toplama kartları</li>
                  <li>Pres kitapları veya bitki presi</li>
                  <li>Kâğıt havlu / kurutma kağıdı</li>
                  <li>Makas</li>
                  <li>Etiket kartları</li>
                  <li>Yapıştırıcı</li>
                  <li>A4 boyutunda resim kağıdı</li>
                  <li>Kalem</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Etkinlik Akışı:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Giriş ve Isınma (10 dk): Herbaryum tanıtımı ve kısa paylaşım.</li>
                  <li>
                    Bitki Toplama (15–20 dk): Doğal yapıya zarar vermeden örnek seçimi; yaşlı bireylerin bilgi ve anı
                    paylaşımı.
                  </li>
                  <li>
                    Bitki Presleme (20 dk): Kurutma kağıtları arasında yerleştirme, presleme ve numaralandırma.
                  </li>
                  <li>Herbaryum Sayfası (15 dk): Etiketleme, tarih/yer bilgisi ve sayfa düzeni.</li>
                  <li>Paylaşım ve Kapanış (5 dk): Sayfaların gösterimi ve duygu paylaşımı.</li>
                </ol>
              </div>
              <p>
                <span className="font-semibold">Değerlendirme: </span>
                Kısa değerlendirme toplantısı, yansıtıcı günlük ve atölye sonunda sayfaların sergilenmesi.
              </p>
            </TabsContent>

            <TabsContent value="meyve-sebze" className="space-y-4 text-sm md:text-base leading-relaxed">
              <h3 className="text-base md:text-lg font-semibold text-center leading-snug">
                Meyve–Sebze Toplama Doğa Atölyesi
              </h3>
              <p>
                <span className="font-semibold">Amaç: </span>
                Katılımcıların doğal üretim süreçlerini deneyimlemeleri, ekosistem ve tarımsal sürdürülebilirlik hakkında
                farkındalık kazanmaları, kuşaklar arası iletişimi güçlendirmeleri ve doğayla etkileşim yoluyla psikolojik
                iyi oluşlarını desteklemeleri amaçlanmaktadır.
              </p>
              <p>
                <span className="font-semibold">Hedef Grup: </span>
                Lise öğrencileri ve yaşlı bireylerden oluşan çalışma grubu.
              </p>
              <div>
                <p className="font-semibold">Öğrenme Çıktıları:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Doğal tarım ürünlerini tanıma.</li>
                  <li>Meyve-sebze toplama tekniklerini öğrenme.</li>
                  <li>Sürdürülebilir tarım ve gıda farkındalığı geliştirme.</li>
                  <li>Kuşaklar arası iletişim ve iş birliği becerilerini güçlendirme.</li>
                  <li>Tarımsal süreçlere yönelik sorumluluk bilinci geliştirme.</li>
                  <li>Duyusal farkındalık ve doğayla bağ kurma becerileri kazanma.</li>
                </ul>
              </div>
              <p>
                <span className="font-semibold">Süre: </span>
                60–90 dakika
              </p>
              <p>
                <span className="font-semibold">Etkinlik Alanı: </span>
                Bahçe, tarım alanı, sera veya çiftlik alanı.
              </p>
              <div>
                <p className="font-semibold">Gerekli Materyaller:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Toplama sepeti veya bez çanta</li>
                  <li>Bahçe eldiveni</li>
                  <li>Makas veya budama makası (güvenli kullanım için)</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Etkinlik Akışı:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>
                    Tanışma ve Isınma (10 dk): Meyve–sebze yetiştiriciliği hakkında kısa sohbet, geçmiş deneyimlerden
                    paylaşımlar.
                  </li>
                  <li>
                    Bilgilendirme (5 dk): Bitkilerin olgunluk göstergeleri, doğru toplama teknikleri ve sürdürülebilir hasat
                    ilkeleri anlatılır.
                  </li>
                  <li>
                    Meyve–Sebze Toplama (25–30 dk): Gruplar hâlinde güvenli biçimde toplama yapılır; yaşlı bireyler
                    yetiştirme ve toplama geleneklerini anlatır.
                  </li>
                  <li>
                    İnceleme ve Duyusal Farkındalık (10 dk): Toplanan ürünlerin kokusu, dokusu, rengi üzerine kısa inceleme;
                    ürünlerin tanımlanması.
                  </li>
                  <li>
                    Değerlendirme ve Paylaşım (5 dk): Toplama deneyimi hakkında duygu–düşünce paylaşımı, ürünlerin
                    paketlenmesi veya sergilenmesi.
                  </li>
                </ol>
              </div>
              <p>
                <span className="font-semibold">Değerlendirme: </span>
                Fotoğraf ve ürün değerlendirmesi.
              </p>
            </TabsContent>

            <TabsContent value="ata-tohumu" className="space-y-4 text-sm md:text-base leading-relaxed">
              <h3 className="text-base md:text-lg font-semibold text-center leading-snug">
                Ata Tohumları Devir Teslim Töreni ve Tanıtım Etkinliği
              </h3>
              <p>
                <span className="font-semibold">Amaç: </span>
                Nesiller arası kültürel aktarımı güçlendirmek, ata tohumlarının önemine vurgu yapmak, geleneksel tarım
                bilgilerini gençlere aktarmak, yaşlı bireylerin yaşam deneyimlerini paylaşmasını sağlamak ve sürdürülebilir
                tarım bilincini geliştirmek.
              </p>
              <p>
                <span className="font-semibold">Hedef Grup: </span>
                Lise öğrencileri ve yaşlı bireylerden oluşan deney grubu katılımcıları.
              </p>
              <div>
                <p className="font-semibold">Öğrenme Çıktıları:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Ata tohumlarının tarihsel ve kültürel önemini öğrenme.</li>
                  <li>Yerel tarım çeşitliliğini tanıma.</li>
                  <li>Nesiller arası bilgi aktarımının değerini fark etme.</li>
                  <li>Sürdürülebilir tarım ve biyolojik çeşitlilik bilinci geliştirme.</li>
                  <li>Devir teslim ritüelinin kültürel anlamını kavrama.</li>
                  <li>Topluluk bilinci ve aidiyet hissinin güçlenmesi.</li>
                </ul>
              </div>
              <p>
                <span className="font-semibold">Süre: </span>
                45–60 dakika
              </p>
              <p>
                <span className="font-semibold">Etkinlik Alanı: </span>
                Saklı Bahçe
              </p>
              <div>
                <p className="font-semibold">Gerekli Materyaller:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Ata tohumları</li>
                  <li>Küçük kavanozlar</li>
                  <li>Etiket kartları</li>
                  <li>Masa örtüsü</li>
                  <li>Fotoğraf makinesi / telefon</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Etkinlik Akışı:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Açılış (5 dk): Ata tohumlarının anlamı ve etkinliğin amacı hakkında kısa bilgilendirme.</li>
                  <li>
                    Ata Tohumlarının Tanıtımı (10 dk): Yaşlı bireyler ata tohumlarının hikâyesini, kullanım alanlarını ve
                    geleneksel tarım yöntemlerini anlatır.
                  </li>
                  <li>
                    Devir Teslim Töreni (10–15 dk): Yaşlı bireyler ata tohumlarını öğrencilere sembolik bir törenle teslim
                    eder; öğrenciler teşekkür ve temsil sözleriyle teslimi kabul eder.
                  </li>
                  <li>
                    Tohum Etiketleme ve Saklama (10 dk): Öğrenciler yaşlı bireylerle birlikte tohumları etiketler
                    (tür–yöre–tarih) ve saklama keselerine yerleştirir.
                  </li>
                  <li>
                    Paylaşım Çemberi (5–10 dk): “Ata tohumları geleceğimiz için ne ifade ediyor?” temalı duygu–düşünce
                    paylaşımı.
                  </li>
                  <li>Kapanış (5 dk): Toplu fotoğraf çekimi, teşekkür konuşması.</li>
                </ol>
              </div>
              <p>
                <span className="font-semibold">Değerlendirme: </span>
                Etkinlik sonrası tohumların ekimi veya korunmasına yönelik takip ve değerlendirme.
              </p>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Activities;
