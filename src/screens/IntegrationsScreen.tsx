import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2Icon, CircleIcon, ExternalLinkIcon } from 'lucide-react';
import { useIntegrationsViewModel } from '@/viewmodels/useIntegrationsViewModel';

export function IntegrationsScreen() {
  const { integrations } = useIntegrationsViewModel();
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Available Integrations</h3>
        <p className="text-sm text-muted-foreground">
          Connect your favorite tools to streamline your workflow
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <Card
            key={integration.id}
            className="bg-card text-card-foreground transition-transform hover:scale-[1.02]"
          >
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-2xl">
                      {integration.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-card-foreground">
                        {integration.name}
                      </h4>
                      {integration.status === 'connected' ? (
                        <div className="flex items-center gap-1 text-success">
                          <CheckCircle2Icon className="h-4 w-4" />
                          <span className="text-xs font-medium">Connected</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <CircleIcon className="h-4 w-4" />
                          <span className="text-xs font-medium">Not connected</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{integration.description}</p>

                <Button
                  className={
                    integration.status === 'connected'
                      ? 'w-full bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      : 'w-full bg-tertiary text-tertiary-foreground hover:bg-tertiary/90'
                  }
                >
                  {integration.status === 'connected' ? (
                    <>
                      <ExternalLinkIcon className="mr-2 h-4 w-4" />
                      Manage
                    </>
                  ) : (
                    'Connect'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
