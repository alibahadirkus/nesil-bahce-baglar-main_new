import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { treesAPI, studentsAPI, volunteersAPI, activitiesAPI } from '@/lib/api';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Calendar as CalendarIcon, TreePine, GraduationCap, Users, Activity } from 'lucide-react';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const { data: trees = [] } = useQuery({
    queryKey: ['trees'],
    queryFn: () => treesAPI.getAll(),
  });

  const { data: students = [] } = useQuery({
    queryKey: ['students'],
    queryFn: () => studentsAPI.getAll(),
  });

  const { data: volunteers = [] } = useQuery({
    queryKey: ['volunteers'],
    queryFn: () => volunteersAPI.getAll(),
  });

  const { data: activities = [] } = useQuery({
    queryKey: ['activities'],
    queryFn: () => activitiesAPI.getAll(),
  });

  // Tarihe göre etkinlikleri grupla
  const getEventsByDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const events: any[] = [];

    // Ağaç dikim tarihleri
    trees.forEach((tree: any) => {
      if (tree.planting_date) {
        const plantingDate = format(new Date(tree.planting_date), 'yyyy-MM-dd');
        if (plantingDate === dateStr) {
          events.push({
            type: 'tree',
            title: `Ağaç Dikimi: ${tree.tree_name}`,
            description: `${tree.student_first_name} & ${tree.volunteer_first_name}`,
            icon: TreePine,
            color: 'bg-green-100 text-green-800',
          });
        }
      }
    });

    // Öğrenci kayıt tarihleri
    students.forEach((student: any) => {
      const createdDate = format(new Date(student.created_at), 'yyyy-MM-dd');
      if (createdDate === dateStr) {
        events.push({
          type: 'student',
          title: `Yeni Öğrenci: ${student.first_name} ${student.last_name}`,
          description: student.class_name || 'Sınıf belirtilmemiş',
          icon: GraduationCap,
          color: 'bg-blue-100 text-blue-800',
        });
      }
    });

    // Gönüllü kayıt tarihleri
    volunteers.forEach((volunteer: any) => {
      const createdDate = format(new Date(volunteer.created_at), 'yyyy-MM-dd');
      if (createdDate === dateStr) {
        events.push({
          type: 'volunteer',
          title: `Yeni Gönüllü: ${volunteer.first_name} ${volunteer.last_name}`,
          description: volunteer.phone,
          icon: Users,
          color: 'bg-purple-100 text-purple-800',
        });
      }
    });

    // Gönüllü aktiviteleri
    activities.forEach((activity: any) => {
      const activityDate = format(new Date(activity.activity_date), 'yyyy-MM-dd');
      if (activityDate === dateStr) {
        events.push({
          type: 'activity',
          title: activity.title,
          description: `${activity.volunteer_first_name || ''} ${activity.volunteer_last_name || ''}${activity.location ? ` - ${activity.location}` : ''}`,
          icon: Activity,
          color: 'bg-orange-100 text-orange-800',
        });
      }
    });

    return events;
  };

  // Takvimde işaretlenecek tarihleri belirle
  const getMarkedDates = () => {
    const dates: Date[] = [];
    
    trees.forEach((tree: any) => {
      if (tree.planting_date) {
        dates.push(new Date(tree.planting_date));
      }
    });

    students.forEach((student: any) => {
      dates.push(new Date(student.created_at));
    });

    volunteers.forEach((volunteer: any) => {
      dates.push(new Date(volunteer.created_at));
    });

    activities.forEach((activity: any) => {
      if (activity.activity_date) {
        dates.push(new Date(activity.activity_date));
      }
    });

    return dates;
  };

  const markedDates = getMarkedDates();
  const selectedDateEvents = selectedDate ? getEventsByDate(selectedDate) : [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Takvim</h2>
        <p className="text-muted-foreground">
          Etkinlikler, ağaç dikim tarihleri ve önemli günler
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Takvim */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Etkinlik Takvimi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={tr}
              className="rounded-md border"
              modifiers={{
                hasEvents: markedDates,
              }}
              modifiersClassNames={{
                hasEvents: 'bg-primary/20 font-semibold',
              }}
            />
          </CardContent>
        </Card>

        {/* Seçili Tarih Etkinlikleri */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate
                ? format(selectedDate, 'd MMMM yyyy', { locale: tr })
                : 'Tarih Seçin'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              <div className="space-y-3">
                {selectedDateEvents.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    Bu tarihte etkinlik yok
                  </p>
                ) : (
                  selectedDateEvents.map((event, index) => {
                    const Icon = event.icon;
                    return (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border ${event.color} border-current/20`}
                      >
                        <div className="flex items-start gap-3">
                          <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm">{event.title}</p>
                            <p className="text-xs mt-1 opacity-80">{event.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                Etkinlikleri görmek için bir tarih seçin
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Toplam Ağaç Dikimi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {trees.filter((t: any) => t.planting_date).length}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Kayıtlı ağaç dikim sayısı
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bu Ay Etkinlikler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {markedDates.filter((date) => {
                const now = new Date();
                return (
                  date.getMonth() === now.getMonth() &&
                  date.getFullYear() === now.getFullYear()
                );
              }).length}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Bu ay gerçekleşen etkinlikler
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Yaklaşan Etkinlikler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {markedDates.filter((date) => date >= new Date()).length}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Gelecekte planlanan etkinlikler
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage;

