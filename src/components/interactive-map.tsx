'use client';
import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { indianStates, type StateData } from '@/lib/heritage-data';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { ScrollArea } from './ui/scroll-area';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import InfoCard from './info-card';
import { Landmark, UtensilsCrossed, CalendarDays, Palette } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const COLORS = [
  'hsl(var(--primary) / 0.8)',
  'hsl(var(--primary) / 0.6)',
  'hsl(var(--primary) / 0.4)',
  'hsl(var(--primary) / 0.2)',
];

const data = indianStates.map((state, index) => ({
  name: state.name,
  value: 1, // Equal value for all states to create equal-sized segments
  slug: state.slug,
  fill: COLORS[index % COLORS.length]
}));

const InteractiveMap = () => {
  const [selectedState, setSelectedState] = useState<StateData | null>(null);

  const handleStateClick = (entry: any) => {
    const stateData = indianStates.find(s => s.name === entry.name);
    setSelectedState(stateData || null);
  };

  return (
    <div className="w-full h-full border-4 border-background rounded-2xl flex items-center justify-center p-4">
      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name }) => name}
            outerRadius="80%"
            fill="#8884d8"
            dataKey="value"
            onClick={handleStateClick}
            className="cursor-pointer focus:outline-none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} stroke='hsl(var(--background))' />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

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
  );
};

export default InteractiveMap;
