
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface WildlifeReportProps {
  reportType: 'wildlife-sighting' | 'wildlife-crime';
  onBack: () => void;
  onSubmit: (report: any) => void;
}

const commonSpecies = [
  'Onça-pintada', 'Arara-azul', 'Tucano', 'Preguiça', 'Tamanduá', 
  'Capivara', 'Jacaré', 'Boto-cor-de-rosa', 'Harpia', 'Uirapuru',
  'Outro (especificar)'
];

const behaviors = [
  'Alimentando', 'Descansando', 'Em movimento', 'Interagindo', 
  'Caçando', 'Reproduzindo', 'Brincando'
];

const conditions = [
  'Saudável', 'Ferido', 'Doente', 'Morto', 'Estressado'
];

const crimeTypes = [
  'Caça ilegal (Poaching)', 'Armadilhas (Trapping)', 
  'Tráfico (Illegal Trade)', 'Outras atividades suspeitas'
];

const WildlifeReport = ({ reportType, onBack, onSubmit }: WildlifeReportProps) => {
  const [species, setSpecies] = useState('');
  const [customSpecies, setCustomSpecies] = useState('');
  const [individuals, setIndividuals] = useState('');
  const [behavior, setBehavior] = useState('');
  const [condition, setCondition] = useState('');
  const [crimeType, setCrimeType] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isWildlifeCrime = reportType === 'wildlife-crime';

  const handlePhotoCapture = () => {
    const mockPhoto = `wildlife_${Date.now()}.jpg`;
    const mockGeoData = {
      latitude: -8.77 + (Math.random() - 0.5) * 0.1,
      longitude: -63.90 + (Math.random() - 0.5) * 0.1,
      timestamp: new Date().toISOString()
    };
    
    console.log(`Foto capturada: ${mockPhoto}`, mockGeoData);
    setPhotos([...photos, mockPhoto]);
  };

  const handleSubmit = async () => {
    if (photos.length === 0) return;
    
    setIsSubmitting(true);
    
    const report = {
      id: `wild_${Date.now()}`,
      type: reportType,
      species: species === 'Outro (especificar)' ? customSpecies : species,
      individuals: parseInt(individuals) || 1,
      behavior: isWildlifeCrime ? undefined : behavior,
      condition: isWildlifeCrime ? undefined : condition,
      crimeType: isWildlifeCrime ? crimeType : undefined,
      description,
      photos,
      location: {
        latitude: -8.77 + (Math.random() - 0.5) * 0.1,
        longitude: -63.90 + (Math.random() - 0.5) * 0.1
      },
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    setTimeout(() => {
      onSubmit(report);
      setIsSubmitting(false);
    }, 2000);
  };

  const getTitle = () => {
    return isWildlifeCrime ? 'Crime contra a Vida Silvestre' : 'Avistamento de Animais';
  };

  const getIcon = () => {
    return isWildlifeCrime ? '🚨' : '🦜';
  };

  const canSubmit = photos.length > 0 && (isWildlifeCrime ? crimeType : species && behavior && condition);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Button onClick={onBack} variant="outline" size="sm">
          ← Voltar
        </Button>
        <div>
          <h2 className="text-xl font-bold text-forest-800">{getTitle()}</h2>
          <p className="text-sm text-muted-foreground">
            {isWildlifeCrime ? 'Denuncie crimes contra animais' : 'Registre observações da fauna'}
          </p>
        </div>
      </div>

      {/* Crime Type (only for wildlife crime) */}
      {isWildlifeCrime && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">🚨</span>
              <span>Tipo de Crime</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select onValueChange={setCrimeType}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de crime..." />
              </SelectTrigger>
              <SelectContent>
                {crimeTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

      {/* Species Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-2xl">{getIcon()}</span>
            <span>Informações da Espécie</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Espécie {isWildlifeCrime && '(se aplicável)'}</Label>
            <Select onValueChange={setSpecies}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a espécie..." />
              </SelectTrigger>
              <SelectContent>
                {commonSpecies.map((spec) => (
                  <SelectItem key={spec} value={spec}>
                    {spec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {species === 'Outro (especificar)' && (
            <div className="space-y-2">
              <Label>Especificar espécie</Label>
              <Input
                placeholder="Nome da espécie..."
                value={customSpecies}
                onChange={(e) => setCustomSpecies(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Número de indivíduos {isWildlifeCrime && '(se aplicável)'}</Label>
            <Input
              type="number"
              placeholder="Ex: 3"
              value={individuals}
              onChange={(e) => setIndividuals(e.target.value)}
              min="1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Behavior and Condition (only for sightings) */}
      {!isWildlifeCrime && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">👀</span>
              <span>Observações</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Comportamento observado</Label>
              <Select onValueChange={setBehavior}>
                <SelectTrigger>
                  <SelectValue placeholder="Como o animal estava se comportando?" />
                </SelectTrigger>
                <SelectContent>
                  {behaviors.map((beh) => (
                    <SelectItem key={beh} value={beh}>
                      {beh}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Condição do animal</Label>
              <Select onValueChange={setCondition}>
                <SelectTrigger>
                  <SelectValue placeholder="Qual a condição aparente?" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((cond) => (
                    <SelectItem key={cond} value={cond}>
                      {cond}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Photos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-2xl">📸</span>
            <span>Evidências Fotográficas</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <Button 
              onClick={handlePhotoCapture}
              className="w-full bg-forest-600 hover:bg-forest-700"
              disabled={photos.length >= 5}
            >
              📷 Capturar Foto com GPS
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              {photos.length}/5 fotos • Mínimo 1 foto obrigatória
            </p>
          </div>

          {photos.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Fotos capturadas:</h4>
              <div className="space-y-2">
                {photos.map((photo, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-forest-50 rounded">
                    <span className="text-sm">📷 {photo}</span>
                    <Badge variant="outline" className="text-xs">GPS ✓</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-2xl">📝</span>
            <span>Descrição Detalhada</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder={isWildlifeCrime ? 
              'Descreva o crime observado em detalhes...' : 
              'Descreva suas observações adicionais...'
            }
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px]"
          />
        </CardContent>
      </Card>

      <div className="flex space-x-3">
        <Button onClick={onBack} variant="outline" className="flex-1">
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={!canSubmit || isSubmitting}
          className={`flex-1 ${isWildlifeCrime ? 'bg-red-600 hover:bg-red-700' : 'bg-forest-600 hover:bg-forest-700'}`}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Relatório'}
        </Button>
      </div>
    </div>
  );
};

export default WildlifeReport;
