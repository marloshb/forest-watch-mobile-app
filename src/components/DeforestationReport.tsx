
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface DeforestationReportProps {
  onBack: () => void;
  onSubmit: (report: any) => void;
}

const deforestationTypes = [
  { value: 'burn-scars', label: 'Burn Scars', description: 'Cicatrizes de queimadas visíveis' },
  { value: 'deforestation-access', label: 'Deforestation - Access', description: 'Abertura de caminhos' },
  { value: 'deforestation-clearcut', label: 'Deforestation - Clearcut', description: 'Corte raso de vegetação' },
  { value: 'deforestation-degradation', label: 'Deforestation - Degradation', description: 'Degradação geral' },
  { value: 'deforestation-chemical', label: 'Deforestation - Chemical Agent', description: 'Uso de agentes químicos' },
  { value: 'deforestation-selective', label: 'Deforestation - Selective Cut', description: 'Corte seletivo' },
  { value: 'mineral-extraction', label: 'Mineral Extraction/Mining', description: 'Extração mineral' },
  { value: 'vessels-others', label: 'Vessels - Others', description: 'Embarcações não especificadas' },
  { value: 'vessels-ferry', label: 'Vessels - Ferry', description: 'Atividade de balsas' },
  { value: 'vessels-dredge', label: 'Vessels - Dredge', description: 'Dragagem' },
  { value: 'burn-focuses', label: 'Burn Focuses', description: 'Focos ativos de queimada' },
  { value: 'airstrip-expansion', label: 'Airstrip - Expansion', description: 'Expansão de pistas' },
  { value: 'airstrip-opening', label: 'Airstrip - Opening', description: 'Abertura de pistas' },
  { value: 'airstrip-reactivation', label: 'Airstrip - Reactivation', description: 'Reativação de pistas' },
  { value: 'illicit-crops', label: 'Illicit Crops', description: 'Cultivos ilícitos' },
  { value: 'natural-blowdown', label: 'Natural Blowdown', description: 'Tombamento natural' },
  { value: 'natural-slips', label: 'Natural Slips', description: 'Deslizamentos naturais' },
  { value: 'fluvial-erosion', label: 'Fluvial Erosion', description: 'Erosão fluvial' },
  { value: 'build-detection', label: 'Build Detection', description: 'Construções detectadas' },
  { value: 'road-detection', label: 'Road Detection', description: 'Estradas recém-abertas' },
  { value: 'fire-origin', label: 'Fire Origin Evidence', description: 'Evidências de origem' },
  { value: 'burning-complementary', label: 'Burning Complementary Area', description: 'Áreas complementares' }
];

const DeforestationReport = ({ onBack, onSubmit }: DeforestationReportProps) => {
  const [selectedType, setSelectedType] = useState('');
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhotoCapture = () => {
    // Simula captura de foto com geotag
    const mockPhoto = `photo_${Date.now()}.jpg`;
    const mockGeoData = {
      latitude: -8.77 + (Math.random() - 0.5) * 0.1,
      longitude: -63.90 + (Math.random() - 0.5) * 0.1,
      timestamp: new Date().toISOString()
    };
    
    console.log(`Foto capturada: ${mockPhoto}`, mockGeoData);
    setPhotos([...photos, mockPhoto]);
  };

  const handleSubmit = async () => {
    if (!selectedType) return;
    
    setIsSubmitting(true);
    
    const report = {
      id: `def_${Date.now()}`,
      type: 'deforestation',
      eventType: selectedType,
      notes,
      photos,
      location: {
        latitude: -8.77 + (Math.random() - 0.5) * 0.1,
        longitude: -63.90 + (Math.random() - 0.5) * 0.1
      },
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    // Simula envio
    setTimeout(() => {
      onSubmit(report);
      setIsSubmitting(false);
    }, 2000);
  };

  const selectedEventType = deforestationTypes.find(type => type.value === selectedType);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Button onClick={onBack} variant="outline" size="sm">
          ← Voltar
        </Button>
        <div>
          <h2 className="text-xl font-bold text-forest-800">Relatório de Desmatamento</h2>
          <p className="text-sm text-muted-foreground">Denuncie atividades de desmatamento</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-2xl">🌲</span>
            <span>Tipo de Evento</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="event-type">Selecione o tipo de evento observado</Label>
            <Select onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Escolha o tipo de desmatamento..." />
              </SelectTrigger>
              <SelectContent>
                {deforestationTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div>
                      <div className="font-medium">{type.label}</div>
                      <div className="text-sm text-muted-foreground">{type.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedEventType && (
            <div className="p-3 bg-forest-50 rounded-lg">
              <h4 className="font-semibold text-forest-800">{selectedEventType.label}</h4>
              <p className="text-sm text-forest-600">{selectedEventType.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

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
              {photos.length}/5 fotos • GPS automático ativado
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-2xl">📝</span>
            <span>Observações Adicionais</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Descreva o que você observou... (opcional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
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
          disabled={!selectedType || isSubmitting}
          className="flex-1 bg-red-600 hover:bg-red-700"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Relatório'}
        </Button>
      </div>
    </div>
  );
};

export default DeforestationReport;
