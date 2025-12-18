'use client';
import React, { useState, memo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from './ui/tooltip';
import INDIA_GEO_JSON from '@/lib/india.json';
import { indianStates, type StateData } from '@/lib/heritage-data';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { ScrollArea } from './ui/scroll-area';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import InfoCard from './info-card';
import { Landmark, UtensilsCrossed, CalendarDays, Palette } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const PROJECTION_CONFIG = {
  scale: 1100,
  center: [82, 22] as [number, number],
};

const geographyStyle = {
  default: {
    outline: 'none',
  },
  hover: {
    fill: 'hsl(var(--primary))',
    transition: 'all 250ms',
    outline: 'none',
  },
  pressed: {
    outline: 'none',
  },
};

const MemoizedGeography = memo(Geography);

const InteractiveMap = () => {
  const [tooltipContent, setTooltipContent] = useState('');
  const [selectedState, setSelectedState] = useState<StateData | null>(null);

  const handleStateClick = (geo: any) => {
    const stateName = geo.properties.st_nm;
    const stateData = indianStates.find(s => s.name === stateName);
    setSelectedState(stateData || null);
  };

  return (
    <TooltipProvider>
      <div className="w-full h-full border-4 border-background rounded-2xl">
        <ComposableMap
          projectionConfig={PROJECTION_CONFIG}
          projection="geoMercator"
          width={800}
          height={600}
          data-tip=""
          style={{ width: '100%', height: '100%' }}
        >
          <ZoomableGroup center={PROJECTION_CONFIG.center} zoom={1}>
            <Geographies geography={INDIA_GEO_JSON}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Tooltip key={geo.rsmKey}>
                    <TooltipTrigger asChild>
                      <MemoizedGeography
                        geography={geo}
                        onMouseEnter={() => setTooltipContent(geo.properties.st_nm)}
                        onMouseLeave={() => setTooltipContent('')}
                        onClick={() => handleStateClick(geo)}
                        style={{
                          ...geographyStyle,
                          default: {
                            ...geographyStyle.default,
                            fill: 'hsl(var(--secondary))',
                            stroke: 'hsl(var(--background))',
                            strokeWidth: 0.5,
                          },
                        }}
                        className="cursor-pointer transition-colors duration-300"
                      />
                    </TooltipTrigger>
                     {tooltipContent === geo.properties.st_nm && (
                       <TooltipContent>
                         <p>{geo.properties.st_nm}</p>
                       </TooltipContent>
                     )}
                  </Tooltip>
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        <Sheet open={!!selectedState} onOpenChange={(isOpen) => !isOpen && setSelectedState(null)}>
            <SheetContent className="w-full sm:max-w-2xl p-0">
                {selectedState && (
                    <ScrollArea className="h-full">
                        <SheetHeader className="p-6">
                            <SheetTitle className="font-headline text-3xl">{selectedState.name}</SheetTitle>
                            <SheetDescription>{selectedState.description}</SheetDescription>
                        </SheetHeader>
                        <div className="relative h-64 w-full">
                            <Image 
                                src={PlaceHolderImages.find(img => img.id === selectedState.imageId)?.imageUrl || ''}
                                alt={selectedState.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <Tabs defaultValue="monuments" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
                                    <TabsTrigger value="monuments"><Landmark className="mr-2 h-4 w-4" />Monuments</TabsTrigger>
                                    <TabsTrigger value="cuisine"><UtensilsCrossed className="mr-2 h-4 w-4" />Cuisine</TabsTrigger>
                                    <TabsTrigger value="festivals"><CalendarDays className="mr-2 h-4 w-4" />Festivals</TabsTrigger>
                                    <TabsTrigger value="art"><Palette className="mr-2 h-4 w-4" />Art</TabsTrigger>
                                </TabsList>
                                <TabsContent value="monuments" className="mt-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {selectedState.monuments.map(item => <InfoCard item={item} category="monuments" key={item.name} />)}
                                    </div>
                                </TabsContent>
                                <TabsContent value="cuisine" className="mt-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {selectedState.cuisine.map(item => <InfoCard item={item} category="cuisine" key={item.name} />)}
                                    </div>
                                </TabsContent>
                                <TabsContent value="festivals" className="mt-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {selectedState.festivals.map(item => <InfoCard item={item} category="festivals" key={item.name} />)}
                                    </div>
                                </TabsContent>
                                <TabsContent value="art" className="mt-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {selectedState.artForms.map(item => <InfoCard item={item} category="art" key={item.name} />)}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </ScrollArea>
                )}
            </SheetContent>
        </Sheet>
      </div>
    </TooltipProvider>
  );
};

export default InteractiveMap;
