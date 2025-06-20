import { TicketList } from '@/components/TicketList';
import { Card } from '@/components/ui/card';

export function MemberTickets() {
  return (
    <div className="flex overflow-auto p-4 sm:justify-center sm:py-8">
      <Card className="w-5xl gap-0 p-0">
        <div className="flex flex-col items-center gap-6 p-2">
          <h1 className="text-xl font-semibold">티켓 목록</h1>
          <TicketList />
        </div>
      </Card>
    </div>
  );
}
