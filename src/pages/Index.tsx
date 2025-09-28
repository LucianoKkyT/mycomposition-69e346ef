import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Users, Share2, Heart, Sparkles, Headphones } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: 'var(--gradient-hero)',
          }}
        />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <Music className="mx-auto h-16 w-16 text-primary mb-4" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MyComposition
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              A rede social exclusiva para compositores musicais.<br />
              <span className="text-primary font-semibold">Conecte-se, compartilhe e inspire-se!</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg" 
                className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ boxShadow: 'var(--shadow-musical)' }}
              >
                <a href="/auth">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Começar Agora
                </a>
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 hover:bg-accent/20 transition-all duration-300"
              >
                <a href="/dashboard">
                  <Headphones className="mr-2 h-5 w-5" />
                  Dashboard
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Para Compositores, Por Compositores
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Uma plataforma criada especificamente para atender às necessidades únicas dos compositores musicais
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <Share2 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Compartilhe Suas Criações</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Publique suas composições, receba feedback valioso da comunidade e construa sua reputação como compositor.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Conecte-se com Artistas</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Encontre colaboradores, mentores e amigos que compartilham sua paixão pela composição musical.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Inspire e Se Inspire</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Descubra novas técnicas, estilos e abordagens através do trabalho de outros compositores talentosos.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para Compartilhar Sua Música com o Mundo?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Junte-se à nossa comunidade crescente de compositores apaixonados e leve sua arte ao próximo nível.
            </p>
            <Button 
              asChild
              size="lg" 
              className="text-lg px-12 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ boxShadow: 'var(--shadow-musical)' }}
            >
              <a href="/auth">
                <Music className="mr-2 h-5 w-5" />
                Criar Conta Gratuita
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <Music className="mx-auto h-8 w-8 text-primary mb-2" />
            <p className="font-semibold text-lg">MyComposition</p>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 MyComposition. A rede social para compositores musicais.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
