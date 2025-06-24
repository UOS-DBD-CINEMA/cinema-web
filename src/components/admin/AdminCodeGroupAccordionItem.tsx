import { useEffect, useState } from 'react';

import {
  CodeDetail,
  CodeGroup,
  getAdminCodedetailsAPI,
} from '@/api/admin/code.api';
import { AdminAddCodeDetailDialog } from '@/components/admin/AdminAddCodeDetailDialog';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { AdminDelCodeDetailDialog } from './AdminDelCodeDetailDialog';

type AdminCodeGroupAccordionItemProps = {
  codeGroup: CodeGroup;
};

export function AdminCodeGroupAccordionItem({
  codeGroup,
}: AdminCodeGroupAccordionItemProps) {
  const [codeDetails, setCodeDetails] = useState<CodeDetail[]>([]);

  useEffect(() => {
    getAdminCodedetailsAPI(codeGroup.id).then(res => {
      setCodeDetails(res.data);
    });
  }, []);
  return (
    <AccordionItem value={codeGroup.id}>
      <AccordionTrigger className="data-[state=open]:text-primary text-lg font-bold">
        {codeGroup.name}
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 text-balance">
        {codeDetails.map(codeDetail => (
          <div key={codeDetail.id} className="flex justify-between text-lg">
            {codeDetail.value}
            <AdminDelCodeDetailDialog
              codeDetail={codeDetail}
              codeDetails={codeDetails}
              setCodeDetails={setCodeDetails}
            />
          </div>
        ))}
        <AdminAddCodeDetailDialog
          codeGroupId={codeGroup.id}
          codeDetails={codeDetails}
          setCodeDetails={setCodeDetails}
        />
      </AccordionContent>
    </AccordionItem>
  );
}
