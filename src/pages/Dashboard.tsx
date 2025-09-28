import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Music, Plus, LogOut, Edit, Trash2 } from 'lucide-react';

interface Composition {
  id: string;
  title: string;
  description: string | null;
  content: any;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();
  const [compositions, setCompositions] = useState<Composition[]>([]);
  const [loadingCompositions, setLoadingCompositions] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    is_public: false
  });

  // Redirecionar usuários não autenticados
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  // Carregar composições do usuário
  useEffect(() => {
    if (user) {
      fetchCompositions();
    }
  }, [user]);

  const fetchCompositions = async () => {
    try {
      const { data, error } = await supabase
        .from('compositions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Erro ao carregar composições');
        return;
      }

      setCompositions(data || []);
    } catch (error) {
      toast.error('Erro inesperado ao carregar composições');
    } finally {
      setLoadingCompositions(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      is_public: checked
    }));
  };

  const handleCreateComposition = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Título é obrigatório');
      return;
    }

    try {
      const { error } = await supabase
        .from('compositions')
        .insert([{
          title: formData.title.trim(),
          description: formData.description.trim() || null,
          is_public: formData.is_public,
          user_id: user!.id
        }]);

      if (error) {
        toast.error('Erro ao criar composição');
        return;
      }

      toast.success('Composição criada com sucesso!');
      setIsDialogOpen(false);
      setFormData({ title: '', description: '', is_public: false });
      fetchCompositions();
    } catch (error) {
      toast.error('Erro inesperado ao criar composição');
    }
  };

  const handleDeleteComposition = async (id: string, title: string) => {
    if (!confirm(`Tem certeza que deseja excluir "${title}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('compositions')
        .delete()
        .eq('id', id);

      if (error) {
        toast.error('Erro ao excluir composição');
        return;
      }

      toast.success('Composição excluída com sucesso!');
      fetchCompositions();
    } catch (error) {
      toast.error('Erro inesperado ao excluir composição');
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Erro ao sair');
    } else {
      toast.success('Logout realizado com sucesso!');
      navigate('/');
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-primary">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Header */}
      <header className="bg-white/10 border-b border-white/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Music className="h-8 w-8 text-white" />
              <h1 className="text-2xl font-bold text-white">MyComposition</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white/80">Olá, {user.email}</span>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Suas Composições</h2>
            <p className="text-white/70 mt-2">Crie e gerencie suas obras musicais</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-primary hover:bg-white/90">
                <Plus className="h-4 w-4 mr-2" />
                Nova Composição
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <form onSubmit={handleCreateComposition}>
                <DialogHeader>
                  <DialogTitle>Criar Nova Composição</DialogTitle>
                  <DialogDescription>
                    Adicione os detalhes da sua nova composição musical
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Nome da sua composição"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Descreva sua composição..."
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_public"
                      checked={formData.is_public}
                      onCheckedChange={handleSwitchChange}
                    />
                    <Label htmlFor="is_public">Tornar pública</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Criar Composição</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Compositions Grid */}
        {loadingCompositions ? (
          <div className="text-center text-white">Carregando composições...</div>
        ) : compositions.length === 0 ? (
          <div className="text-center py-12">
            <Music className="h-16 w-16 text-white/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Nenhuma composição ainda</h3>
            <p className="text-white/70 mb-6">Crie sua primeira composição para começar!</p>
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="bg-white text-primary hover:bg-white/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeira Composição
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {compositions.map((composition) => (
              <Card key={composition.id} className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    {composition.title}
                    {composition.is_public && (
                      <span className="text-xs bg-white/20 text-white px-2 py-1 rounded">
                        Público
                      </span>
                    )}
                  </CardTitle>
                  {composition.description && (
                    <CardDescription className="text-white/70">
                      {composition.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-white/60 text-sm">
                    Criada em {new Date(composition.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-red-500/20 border-red-500/40 text-red-100 hover:bg-red-500/30"
                    onClick={() => handleDeleteComposition(composition.id, composition.title)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}