import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, UserPlus, TreePine, Droplets, Sprout, Camera, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { publicStudentsAPI, publicVolunteersAPI } from '@/lib/api';

const Process = () => {
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false);
  const [isVolunteerDialogOpen, setIsVolunteerDialogOpen] = useState(false);
  const [isPhotoGalleryOpen, setIsPhotoGalleryOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [studentForm, setStudentForm] = useState({
    first_name: '',
    last_name: '',
    student_number: '',
    class_name: '',
    school_name: '',
    phone: '',
    email: '',
    notes: '',
  });

  const [volunteerForm, setVolunteerForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  });

  const steps = [
    {
      step: 1,
      icon: GraduationCap,
      title: 'Öğrenci Kaydı',
      description:
        'Lise öğrencileri projeye kaydolur ve kendilerine bir gönüllü eşleştirilir',
      onClick: () => setIsStudentDialogOpen(true),
    },
    {
      step: 2,
      icon: UserPlus,
      title: 'Gönüllü Eşleştirme',
      description:
        'Her öğrenci bir gönüllü ile eşleştirilir ve birlikte çalışmaya başlarlar',
    },
    {
      step: 3,
      icon: TreePine,
      title: 'Gönüllü Katılımcı',
      description: 'Öğrenci ve gönüllü birlikte okul bahçesinde ağacı dikerler',
      onClick: () => setIsVolunteerDialogOpen(true),
    },
    {
      step: 4,
      icon: Droplets,
      title: 'Bakım ve Sulama',
      description:
        "Ağacın düzenli bakımı ve sulaması yapılır, her adımda gönüllüye bilgi SMS'i gönderilir",
    },
    {
      step: 5,
      icon: Sprout,
      title: 'Büyüme Takibi',
    },
    {
      step: 6,
      icon: Camera,
      title: 'Fotoğraflar',
      onClick: () => setIsPhotoGalleryOpen(true),
    },
  ];

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentForm.first_name || !studentForm.last_name) {
      toast({
        title: 'Eksik bilgi',
        description: 'Lütfen öğrenci ad ve soyadını doldurun.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await publicStudentsAPI.create(studentForm);
      toast({
        title: 'Başvurunuz alındı',
        description:
          'Öğrenci kaydınız başarıyla oluşturuldu. En kısa sürede sizinle iletişime geçilecektir.',
      });
      setStudentForm({
        first_name: '',
        last_name: '',
        student_number: '',
        class_name: '',
        school_name: '',
        phone: '',
        email: '',
        notes: '',
      });
      setIsStudentDialogOpen(false);
    } catch (error: any) {
      toast({
        title: 'Kayıt oluşturulamadı',
        description: error.message || 'Lütfen daha sonra tekrar deneyin.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerForm.first_name || !volunteerForm.last_name || !volunteerForm.phone) {
      toast({
        title: 'Eksik bilgi',
        description: 'Lütfen ad, soyad ve telefon alanlarını doldurun.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await publicVolunteersAPI.create(volunteerForm);
      toast({
        title: 'Başvurunuz alındı',
        description:
          'Gönüllü kaydınız başarıyla oluşturuldu. En kısa sürede sizinle iletişime geçilecektir.',
      });
      setVolunteerForm({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        address: '',
        notes: '',
      });
      setIsVolunteerDialogOpen(false);
    } catch (error: any) {
      toast({
        title: 'Kayıt oluşturulamadı',
        description: error.message || 'Lütfen daha sonra tekrar deneyin.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Proje Süreci
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            const isClickable = Boolean(step.onClick);
            return (
              <Card
                key={step.step}
                className={`border-2 border-border transition-all shadow-soft hover:shadow-strong ${
                  isClickable ? 'hover:border-primary cursor-pointer' : 'hover:border-primary/70'
                }`}
                onClick={step.onClick}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 inline-flex p-2 bg-gradient-primary rounded-lg">
                        <Icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-foreground">{step.title}</h3>
                      <div className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>

      {/* Öğrenci Kayıt Formu */}
      <Dialog open={isStudentDialogOpen} onOpenChange={setIsStudentDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Öğrenci Kaydı</DialogTitle>
            <DialogDescription>
              Projeye katılmak isteyen lise öğrencileri için başvuru formu. Bilgileriniz sadece proje
              kapsamında kullanılacaktır.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleStudentSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="student_first_name">Ad *</Label>
                <Input
                  id="student_first_name"
                  value={studentForm.first_name}
                  onChange={(e) =>
                    setStudentForm({ ...studentForm, first_name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="student_last_name">Soyad *</Label>
                <Input
                  id="student_last_name"
                  value={studentForm.last_name}
                  onChange={(e) =>
                    setStudentForm({ ...studentForm, last_name: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="student_school_name">Okul</Label>
                <Input
                  id="student_school_name"
                  value={studentForm.school_name}
                  onChange={(e) =>
                    setStudentForm({ ...studentForm, school_name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="student_class_name">Sınıf</Label>
                <Input
                  id="student_class_name"
                  value={studentForm.class_name}
                  onChange={(e) =>
                    setStudentForm({ ...studentForm, class_name: e.target.value })
                  }
                  placeholder="9-A, 10-B vb."
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="student_phone">Telefon</Label>
                <Input
                  id="student_phone"
                  type="tel"
                  value={studentForm.phone}
                  onChange={(e) =>
                    setStudentForm({ ...studentForm, phone: e.target.value })
                  }
                  placeholder="05XX XXX XX XX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="student_email">E-posta</Label>
                <Input
                  id="student_email"
                  type="email"
                  value={studentForm.email}
                  onChange={(e) =>
                    setStudentForm({ ...studentForm, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="student_notes">Notlar</Label>
              <Textarea
                id="student_notes"
                value={studentForm.notes}
                onChange={(e) =>
                  setStudentForm({ ...studentForm, notes: e.target.value })
                }
                rows={3}
                placeholder="Özel ihtiyaçlar, tercih ettiğiniz günler vb."
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsStudentDialogOpen(false)}
              >
                İptal
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Gönüllü Kayıt Formu */}
      <Dialog open={isVolunteerDialogOpen} onOpenChange={setIsVolunteerDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Gönüllü Katılımcı Kaydı</DialogTitle>
            <DialogDescription>
              Projeye gönüllü olarak katılmak için formu doldurun. Sizinle en kısa sürede iletişime
              geçeceğiz.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleVolunteerSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="volunteer_first_name">Ad *</Label>
                <Input
                  id="volunteer_first_name"
                  value={volunteerForm.first_name}
                  onChange={(e) =>
                    setVolunteerForm({ ...volunteerForm, first_name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="volunteer_last_name">Soyad *</Label>
                <Input
                  id="volunteer_last_name"
                  value={volunteerForm.last_name}
                  onChange={(e) =>
                    setVolunteerForm({ ...volunteerForm, last_name: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="volunteer_phone">Telefon *</Label>
              <Input
                id="volunteer_phone"
                type="tel"
                value={volunteerForm.phone}
                onChange={(e) =>
                  setVolunteerForm({ ...volunteerForm, phone: e.target.value })
                }
                required
                placeholder="05XX XXX XX XX"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="volunteer_email">E-posta</Label>
              <Input
                id="volunteer_email"
                type="email"
                value={volunteerForm.email}
                onChange={(e) =>
                  setVolunteerForm({ ...volunteerForm, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="volunteer_address">Adres</Label>
              <Textarea
                id="volunteer_address"
                value={volunteerForm.address}
                onChange={(e) =>
                  setVolunteerForm({ ...volunteerForm, address: e.target.value })
                }
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="volunteer_notes">Notlar</Label>
              <Textarea
                id="volunteer_notes"
                value={volunteerForm.notes}
                onChange={(e) =>
                  setVolunteerForm({ ...volunteerForm, notes: e.target.value })
                }
                rows={3}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsVolunteerDialogOpen(false)}
              >
                İptal
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Foto Galeri Dialog */}
      <Dialog open={isPhotoGalleryOpen} onOpenChange={setIsPhotoGalleryOpen}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Proje Fotoğrafları</DialogTitle>
            <DialogDescription>
              Proje süresince çekilen fotoğraflar
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto px-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
              {[
                { name: 'ağaçdikimi.jpeg', title: 'Ağaç Dikimi' },
                { name: 'atatohumları.jpeg', title: 'Ata Tohumları' },
                { name: 'atatohumları2.jpeg', title: 'Ata Tohumları' },
                { name: 'herbaryum.jpeg', title: 'Herbaryum' },
                { name: 'herbaryum2.jpeg', title: 'Herbaryum' },
                { name: 'kuşcenneti.jpeg', title: 'Kuş Cenneti' },
                { name: 'kuşcenneti2.jpeg', title: 'Kuş Cenneti' },
                { name: 'kuşcenneti3.jpeg', title: 'Kuş Cenneti' },
                { name: 'meyvesebzetoplama.jpeg', title: 'Meyve Sebze Toplama' },
                { name: 'meyvesebzetoplama2.jpeg', title: 'Meyve Sebze Toplama' },
                { name: 'ormanbanyosu2.jpeg', title: 'Orman Banyosu' },
                { name: 'ormanbanyosuterapi.jpeg', title: 'Orman Banyosu Terapi' },
                { name: 'saklıbahçe.jpeg', title: 'Saklı Bahçe' },
                { name: 'saklıbahçe2.jpeg', title: 'Saklı Bahçe' },
                { name: 'saklıbahçe3.jpeg', title: 'Saklı Bahçe' },
              ].map((image, index) => (
                <div
                  key={index}
                  className="group relative rounded-xl overflow-hidden border-2 border-border bg-card shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                  onClick={() => setSelectedImage(`/images/${image.name}`)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={`/images/${image.name}`}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                        <Camera className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-medium truncate">{image.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Lightbox Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-200"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors bg-black/50 hover:bg-black/70 rounded-full p-2 backdrop-blur-sm"
                onClick={() => setSelectedImage(null)}
                aria-label="Kapat"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="relative max-w-[95vw] max-h-[95vh] flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Büyütülmüş fotoğraf"
                  className="max-w-full max-h-[95vh] object-contain rounded-lg shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Process;



