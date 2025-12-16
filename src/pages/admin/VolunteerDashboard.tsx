import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { volunteersAPI, studentsAPI, treesAPI, smsAPI } from '@/lib/api';
import { Users, UserPlus, TreePine, MessageSquare, Phone, Mail, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

const VolunteerDashboard = () => {
  const { data: volunteers = [], isLoading: volunteersLoading } = useQuery({
    queryKey: ['volunteers'],
    queryFn: () => volunteersAPI.getAll(),
  });

  const { data: students = [] } = useQuery({
    queryKey: ['students'],
    queryFn: () => studentsAPI.getAll(),
  });

  const { data: trees = [] } = useQuery({
    queryKey: ['trees'],
    queryFn: () => treesAPI.getAll(),
  });

  const { data: smsHistory = [] } = useQuery({
    queryKey: ['sms-history'],
    queryFn: () => smsAPI.getHistory(undefined, 100),
  });

  // Gönüllü istatistikleri
  const stats = {
    totalVolunteers: volunteers.length,
    activeVolunteers: volunteers.filter((v: any) => {
      // Eşleştirilmiş gönüllüler aktif sayılır
      return students.some((s: any) => s.volunteer_id === v.id);
    }).length,
    pairedVolunteers: volunteers.filter((v: any) =>
      students.some((s: any) => s.volunteer_id === v.id)
    ).length,
    welcomeSmsSent: volunteers.filter((v: any) => v.welcome_sms_sent).length,
    volunteersWithTrees: volunteers.filter((v: any) =>
      trees.some((t: any) => t.volunteer_id === v.id)
    ).length,
    totalTreesByVolunteers: trees.filter((t: any) => t.volunteer_id).length,
  };

  // Gönüllü başına ağaç sayısı
  const getTreesByVolunteer = (volunteerId: number) => {
    return trees.filter((t: any) => t.volunteer_id === volunteerId).length;
  };

  // Gönüllü başına öğrenci sayısı
  const getStudentsByVolunteer = (volunteerId: number) => {
    return students.filter((s: any) => s.volunteer_id === volunteerId).length;
  };

  // En aktif gönüllüler
  const topVolunteers = [...volunteers]
    .map((v: any) => ({
      ...v,
      treeCount: getTreesByVolunteer(v.id),
      studentCount: getStudentsByVolunteer(v.id),
      activityScore: getTreesByVolunteer(v.id) + getStudentsByVolunteer(v.id) * 2,
    }))
    .sort((a, b) => b.activityScore - a.activityScore)
    .slice(0, 10);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Gönüllü Dashboard</h2>
        <p className="text-muted-foreground">
          Gönüllü istatistikleri ve performans analizi
        </p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Gönüllü</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVolunteers}</div>
            <p className="text-xs text-muted-foreground">
              Kayıtlı gönüllü sayısı
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Gönüllüler</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeVolunteers}</div>
            <p className="text-xs text-muted-foreground">
              Eşleştirilmiş gönüllüler
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ağaç Dikimi</CardTitle>
            <TreePine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTreesByVolunteers}</div>
            <p className="text-xs text-muted-foreground">
              Gönüllüler tarafından dikilen
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hoşgeldin SMS</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.welcomeSmsSent}</div>
            <p className="text-xs text-muted-foreground">
              Gönderilen hoşgeldin mesajı
            </p>
          </CardContent>
        </Card>
      </div>

      {/* En Aktif Gönüllüler */}
      <Card>
        <CardHeader>
          <CardTitle>En Aktif Gönüllüler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Gönüllü</TableHead>
                  <TableHead>İletişim</TableHead>
                  <TableHead>Eşleştirilen Öğrenci</TableHead>
                  <TableHead>Dikilen Ağaç</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Kayıt Tarihi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {volunteersLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Yükleniyor...
                    </TableCell>
                  </TableRow>
                ) : topVolunteers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Henüz gönüllü kaydı yok
                    </TableCell>
                  </TableRow>
                ) : (
                  topVolunteers.map((volunteer: any) => (
                    <TableRow key={volunteer.id}>
                      <TableCell className="font-medium">
                        <div>
                          <p>{volunteer.first_name} {volunteer.last_name}</p>
                          {volunteer.email && (
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <Mail className="h-3 w-3" />
                              {volunteer.email}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {volunteer.phone}
                          </p>
                          {volunteer.address && (
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {volunteer.address.substring(0, 30)}...
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {volunteer.studentCount} öğrenci
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-green-600">
                          <TreePine className="h-3 w-3 mr-1" />
                          {volunteer.treeCount} ağaç
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {volunteer.welcome_sms_sent ? (
                          <Badge className="bg-green-100 text-green-800">
                            Aktif
                          </Badge>
                        ) : (
                          <Badge variant="outline">Beklemede</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {format(new Date(volunteer.created_at), 'd MMM yyyy', { locale: tr })}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Gönüllü Dağılımı */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Gönüllü Durumu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Eşleştirilmiş Gönüllüler</span>
                <span className="font-semibold">{stats.pairedVolunteers}</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{
                    width: `${stats.totalVolunteers > 0 ? (stats.pairedVolunteers / stats.totalVolunteers) * 100 : 0}%`,
                  }}
                />
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-sm">Ağaç Dikimi Yapan</span>
                <span className="font-semibold">{stats.volunteersWithTrees}</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${stats.totalVolunteers > 0 ? (stats.volunteersWithTrees / stats.totalVolunteers) * 100 : 0}%`,
                  }}
                />
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-sm">Hoşgeldin SMS Gönderilen</span>
                <span className="font-semibold">{stats.welcomeSmsSent}</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width: `${stats.totalVolunteers > 0 ? (stats.welcomeSmsSent / stats.totalVolunteers) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Son Eklenen Gönüllüler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {volunteers
                .slice()
                .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                .slice(0, 5)
                .map((volunteer: any) => (
                  <div
                    key={volunteer.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div>
                      <p className="font-medium">
                        {volunteer.first_name} {volunteer.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground">{volunteer.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(volunteer.created_at), 'd MMM yyyy', { locale: tr })}
                      </p>
                      {volunteer.welcome_sms_sent && (
                        <Badge className="bg-green-100 text-green-800 text-xs mt-1">
                          SMS Gönderildi
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              {volunteers.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  Henüz gönüllü kaydı yok
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VolunteerDashboard;

