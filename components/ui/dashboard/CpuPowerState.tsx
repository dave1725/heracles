'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const CpuPowerState = () => {
  const [acState, setAcState] = useState<number | null>(null);
  const [dcState, setDcState] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Replace with your real endpoint call
    fetch('http://localhost:3000/api/power/get-cpu-power')
      .then(res => res.json())
      .then(data => {
        setAcState(data.maxProcessorStateAC);
        setDcState(data.maxProcessorStateDC);
      })
      .catch(() => toast.error('Failed to load CPU power state'))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('http://localhost:3000/api/power/set-cpu-power', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ acValue: acState, dcValue: dcState }),
      }); 

      if (!res.ok) throw new Error();

      toast.success('CPU power state updated successfully');
    } catch {
      toast.error('Failed to update CPU power state');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Processor Power State</h2>
      <Card>
        <CardHeader>
          <CardTitle>Max CPU Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {loading ? (
            <p className="text-muted-foreground">Loading current settings...</p>
          ) : (
            <>
              <div className="space-y-2">
                <Label>Plugged In (AC)</Label>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[acState ?? 100]}
                  onValueChange={([val]) => setAcState(val)}
                />
                <p className="text-sm text-muted-foreground">{acState}%</p>
              </div>
              <div className="space-y-2">
                <Label>On Battery (DC)</Label>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[dcState ?? 100]}
                  onValueChange={([val]) => setDcState(val)}
                />
                <p className="text-sm text-muted-foreground">{dcState}%</p>
              </div>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save Settings'}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default CpuPowerState;
