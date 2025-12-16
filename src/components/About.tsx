import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Heart, Users, Sprout, Brain } from "lucide-react";

const About = () => {
  const [isDiagramOpen, setIsDiagramOpen] = useState(false);
  const [isEcologyDialogOpen, setIsEcologyDialogOpen] = useState(false);
  const [isHorticultureDialogOpen, setIsHorticultureDialogOpen] = useState(false);

  const benefits = [
    {
      icon: Heart,
      title: "Araştırma Amacı",
      description: "Proje Amacı"
    },
    {
      icon: Users,
      title: "Ekopsikolojik Yaklaşımın Önemi",
      description: "Ekolojik yaklaşım"
    },
    {
      icon: Sprout,
      title: "Proje Amacı",
      description: ""
    }
  ];

  return (
    <section className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Proje Hakkında
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Bu web sitesi TÜBİTAK 2204-A Lise Öğrencileri Araştırma Projeleri Yarışması kapsamında gerçekleştirilen
            &quot;Nesilden Nesile Yeşil Geleceğe&quot; projesi ile ilgili bilgi paylaşımı ve etkileşim amacıyla kurulmuştur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-16 justify-items-center">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const isProjectPurpose = benefit.title === "Araştırma Amacı";
            const isEcologyApproach = benefit.title === "Ekopsikolojik Yaklaşımın Önemi";
            const isHorticulture = benefit.title === "Proje Amacı";
            const isInteractive = isProjectPurpose || isEcologyApproach || isHorticulture;
            return (
              <Card
                key={index}
                className={`border-2 border-border hover:border-primary transition-all shadow-soft hover:shadow-strong ${
                  isInteractive ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" : ""
                }`}
              >
                <CardContent
                  className={`pt-6 ${isInteractive ? "select-none" : ""}`}
                  onClick={
                    isProjectPurpose
                      ? () => setIsDiagramOpen(true)
                      : isEcologyApproach
                        ? () => setIsEcologyDialogOpen(true)
                        : isHorticulture
                          ? () => setIsHorticultureDialogOpen(true)
                          : undefined
                  }
                  role={isInteractive ? "button" : undefined}
                  tabIndex={isInteractive ? 0 : undefined}
                >
                  <div className="mb-4 inline-flex p-3 bg-gradient-primary rounded-lg">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground text-center">
                    {benefit.title}
                  </h3>
                  <p className="text-base text-muted-foreground text-center">
                    {benefit.description}
                  </p>
                  {(isProjectPurpose || isEcologyApproach || isHorticulture) && (
                    <p className="text-xs text-primary mt-3 font-medium uppercase tracking-wide">
                      Şemayı görmek için tıklayın
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="border-2 border-primary/20 bg-card shadow-strong">
          <CardContent className="p-8 md:p-12">
            <div className="prose prose-lg max-w-none" />
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDiagramOpen} onOpenChange={setIsDiagramOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Araştırma Amacı</DialogTitle>
            <DialogDescription>
              Proje amacını ve araştırmanın odağını açıklayan metin.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 text-base leading-relaxed text-emerald-700 text-justify space-y-4">
            <p>
              Araştırmanın amacı, “Yeşil Vatan” temasıyla uygun olarak ekopsikoloji yaklaşımı ile araştırmacı
              tarafından tasarlanan doğa temelli etkinliklerin; yaşlı bireylerin psikolojik iyi oluşlarını artırma
              potansiyelini incelemek ve nesiller arası etkileşim ile lise öğrencilerinin yaşlı bireylere yönelik
              tutumlarını olumlu yönde dönüştürmektir. Çalışmada, iki kuşağın birlikte gerçekleştirdiği doğa temelli
              etkinliklerin, hem lise öğrencilerinin hem de yaşlı bireylerin ağaç ve çevreye yönelik tutumlarında
              oluşturacağı etkinin tespit edilmesi araştırmanın diğer bir amacı olarak belirlenmiştir.
            </p>
            <p>
              Gerçekleştirilen etkinlikler, yaşlıların aile ve toplum içindeki değerini pekiştirecek, toplumsal
              bağların ve nesiller arası bağı destekleyecek nitelikte oluşturulmuştur. Çalışma kapsamında, yaşlı
              bireylerin sosyal hayata katılımının artırılması, toplumsal ve çevreye yönelik değerleri lise
              öğrencilerine aktarması hedeflenmektedir. Araştırma bu yönüyle aktif yaşlanmayı destekleyen, gençlerin
              çevresel ve toplumsal sorumluluk bilincini artıran ve nesiller arası etkileşimi teşvik eden bütüncül bir
              model ortaya koymaktadır.
            </p>
            <p>
              Araştırmada yaşlı bireylerin gençlere kültürel birikimlerini, yaşam deneyimlerini ve toplumsal değerleri
              aktarması; gençlerin ise yaşlı bireylerin 21. yüzyıl becerilerinden dijital becerilerini geliştirmelerine
              destek olması, ekopsikolojik yaklaşımla doğa temelli ve kuşaklar arası etkileşim içeren öğrenme
              ortamlarının her iki grup açısından duygusal, sosyal ve bilişsel katkılarının olması beklenmektedir.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEcologyDialogOpen} onOpenChange={setIsEcologyDialogOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ekopsikolojik Yaklaşımın Önemi</DialogTitle>
            <DialogDescription>
              Projenin ekopsikoloji perspektifiyle doğa ile kurduğu bağın kısa özeti.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 text-base leading-relaxed text-emerald-700 text-justify space-y-4">
            <p>
              Ekopsikolojik yaklaşımların temelinde insan ve doğa arasında gelişebilecek çarpık ilişkiyi düzenlemek yer
              alır. Birey ve doğa arasındaki bu çarpık ilişki, insanları doğayı tahrip etmelerine neden olabilmektedir.
              Küresel anlamda tüm dünyada görülen bu tahribatın önüne geçebilmek adına bireylerde doğa bilinci
              geliştirmek ekopsikolojinin üstlenmiş olduğu önemli rollerden birisidir. Ekopsikoloji aracılığı ile insan
              ve doğa arasındaki bağ kuvvetlendiğinde bireylerin daha koruyucu bir rol üstlenmeleri sağlanabilir,
              ekolojik krizlerin önüne geçilmiş olur (Kahn ve diğerleri, 2012).
            </p>
            <p>
              Doğadaki bozulmanın ve insanın ait olduğu doğadan kopuşunun ruh sağlığı üzerindeki olumsuz etkileri
              günümüzde kolektif travmaların dahi kaynağı olarak görülmektedir. Bu bağlamda doğa temelli uygulamalar,
              psikolojik danışmanlığın danışanın yararına kaynaklar kullanmaya yatkın yapısına oldukça uygun
              gözükmektedir. Doğa temelli uygulamaların psikolojik danışmanlık alanına entegre edilmesiyle bireylerin
              kaybetmeye başladığı doğa ile olan temas arttırılabilir. Bireyler doğayı göz ederek geliştirdikleri çözüm
              önerileri sayesinde fizyolojik ve psikolojik olarak daha sağlıklı bir yaşam elde edebilir.
            </p>
            <p>
              Sonuç olarak ekopsikoloji, doğa temelli pek çok terapi okulunu içeren geniş çerçeveli bir kavramdır. Doğa
              temelli tüm uygulamaların, doğanın iyileştirici gücünü psikolojik danışmanlığın pratikleri ile birleştiren
              ruh sağlığı uzmanları tarafından gerçekleştirilmesi gerekir. Temelde danışanın doğaya verdiği değere dayalı
              olarak doğa temelli bir çalışmayı seçmesi ve doğal çevre olan etkileşimini güçlendirmek istemesi,
              psikolojik danışmanlığın kişinin kendini gerçekleştirmesi kavramı ile uyumludur ve doğa, kişinin
              potansiyelini keşfetmesinde etkili bir araçtır.
            </p>
            <p>
              Ekopsikolojik yaklaşımlar, doğanın, kişinin kendisi ile ilgili yeni keşifler gerçekleştirebileceği ve
              yaratıcı çözümlere teşvik edeceği temel prensibi ile hareket ederler. Ancak ekopsikolojiyi tek başına bir
              iyileşme metodu olarak görmek doğru olmaz. Ekopsikoloji ve doğa temelli tüm terapiler, psikolojik
              danışmanların uyguladıkları metotların tamamlayıcısı ya da o metotların uygun çevre ile birleştirilmesi
              yoluyla gerçekleşmektedir.
            </p>
            <p>
              Ekopsikoloji ve doğa temelli terapiler, açık hava etkinlikleri aracılığıyla danışanı harekete geçmeye
              teşvik eden bir yapıya sahiptir. Bu yönü ile psikolojik danışmanlık alanı için yeni bir soluk getireceği
              düşünülmektedir. Terapötik ilişki içerisinde danışanın aktif olması ve sürece fiziksel aktiviteler
              aracılığıyla katılması iyileştirici etkinin daha hızlı ortaya çıkmasına aracılık edebilir. Ekopsikoloji ve
              psikolojik danışmanlık alanındaki çalışmalar incelendiğinde konuyla alakalı çalışan uzmanların doğanın
              iyileştirici etkisinin terapi ortamında deneyimlenebileceği müdahale programları geliştirdikleri
              görülmektedir.
            </p>
            <p>
              Geliştirilmiş olan programların temelinde John Dewey’in deneyime bağlı öğrenme yaklaşımının yer aldığı
              görülmektedir. Dewey’in öğrenme yaklaşımı, yeterli öğrenmenin sağlanabilmesi için mümkün olduğunca fazla
              duyunun kullanılması gerektiğini vurgular (Şirin-Ayva, 2018). Birey deneyimsel öğrenme ile yaparak ve
              yaşayarak öğrendiğinde daha kalıcı öğrenmeler elde edebilir. Terapi süreci bir öğrenme deneyimi olarak ele
              alındığında, doğa ortamında gerçekleştirilen ekopsikoloji temelli müdahale programlarının etkililiği daha
              görünür olmaktadır.
            </p>
            <p>
              Bazen yalnızca doğada vakit geçirmek bile bireye yeni deneyimler kazandırarak terapi ortamının
              etkilerinin görülebileceği bir ortam yaratabilir. Nitekim burada önemli olan kişinin doğada olması değil
              doğada elde ettiği deneyimleri yorumlayabilmesidir (Amesberger, 1998). Grupla psikolojik danışmanlık
              sürecinde danışanlar elde ettikleri çeşitli deneyimleri yorumlayarak kalıcı değişiklikler elde etmeye
              çalışırlar. Toplumsal hayat içerisinde karşılaşılabilecek sorunlar daha küçük bir grup içerisinde
              deneyimlenerek yorumlanır ve bu sayede yeni ve kalıcı öğrenmeler elde edilebilir.
            </p>
            <p>
              Bu nedenle deneyime bağlı öğrenme modelinde toplumsal ortamların hızlandırıcı bir etkisinin olduğu
              düşünülmektedir (Arslan, 2007). Doğa temelli terapilerin temelinde de danışmanlık sürecinin bu yönü
              kullanılmaktadır. Ekopsikolojide kullanılan danışan merkezli terapi süreci, bilimsel yöntemler kullanılarak
              problem çözme becerilerinin geliştirilmesine olanak tanır ve kişilerarası ilişki kurma becerilerini
              geliştirir (Ağaoğlu, 2013). Berman ve Davis-Berman (2000), doğa ortamında gerçekleştirilen ekopsiklojik
              faaliyetlerin çevresel uyum, duygu kontrolü, liderlik ve mental iyi oluş açısından bireyleri
              desteklediğini vurgulamaktadır.
            </p>
            <p>
              Ekopsikoloji kavramı eğitim süreçleri ve okul psikolojik danışmanlık faaliyetleri çerçevesinde
              değerlendirildiğinde öğrencilerin öğrenme deneyimlerini zenginleştirme konusunda faydalı olduğu
              söylenebilir. Doğa ortamında planlı şekilde hazırlanan programlar, öğrencilerin bu kazanımları elde
              etmelerine yardımcı olmaktadır. Öğrenciler özellikle denizler, nehirler, orman ve benzeri doğa ortamlarında
              deneyime dayalı öğrenmeler elde edebilir (Gass ve diğerleri, 2012). Williams (2000) özellikle ergenler
              üzerinde yürüttüğü çalışmalarda ekopsikolojik faaliyetlerin olumlu etkisine vurgu yapmıştır. Jelalian ve
              diğerleri (2006) de benzer bulgularla eğitim sürecinde ekopsikolojinin önemini vurgulamışlardır.
            </p>
            <p>
              Özellikle okul rehberlik faaliyetleri içerisinde kaygı ile baş etme, bilinçli farkındalık çalışmaları,
              çevre bilinci kazanımı, yaratıcı düşünceyi geliştirme ve benzeri konularda ekopsikolojinin etkili
              olabileceği düşünülmektedir. Ülkemizde bu bağlamda öğrencileri destekleyecek özelleşmiş eğitim
              programlarına duyulan ihtiyaç günümüzde yavaş yavaş ortaya çıkmaktadır. Doğa temelli uygulamalar bu konuda
              gerçekleştirilecek her türlü araştırma ve çalışmayla desteklenmeli ve profesyonel eğitim içerikleri
              oluşturulmalıdır.
            </p>
            <p className="text-sm text-emerald-800 font-medium">
              Kaynakça: Kütük, H., &amp; Canel, A. (2024). Psikolojik Danışmanlıkta Özgül Bir Alan: Ekopsikoloji. Marmara
              Üniversitesi Atatürk Eğitim Fakültesi Eğitim Bilimleri Dergisi, 60(60), 1-17.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isHorticultureDialogOpen} onOpenChange={setIsHorticultureDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Proje Amacı</DialogTitle>
            <DialogDescription>
              Araştırma kapsamında uygulanan doğa temelli etkinliklerin genel akışının özeti.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 text-base leading-relaxed text-emerald-700 text-justify">
            Projenin süreci, lise öğrencileri ve yaşlı bireylerin doğa temelli etkinliklerde bir araya geldiği, planlı
            ve yapılandırılmış bir akıştan oluşmaktadır. Katılımcılar, doğa yürüyüşleri, fidan dikimi, bahçe bakımı ve
            ağaç gözlemleri gibi etkinlikler aracılığıyla hem ekolojik farkındalık kazanmakta hem de nesiller arası
            etkileşim deneyimi yaşamaktadır. Süreç boyunca öğrenciler, yaşlı bireylerin yaşam deneyimlerini ve kültürel
            birikimlerini dinlerken; yaşlı bireyler de gençlerin desteğiyle dijital becerilerini geliştirme fırsatı
            bulmaktadır. Böylece proje, doğa temelli etkinlikleri, kuşaklar arası öğrenme ve psikolojik iyi oluşu
            destekleyen bütüncül bir süreç olarak kurgulamaktadır.
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default About;
