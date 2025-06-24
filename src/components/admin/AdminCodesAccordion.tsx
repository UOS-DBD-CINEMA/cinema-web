import { useEffect, useState } from 'react';

import { CodeGroup, getAdminCodeGroupsAPI } from '@/api/admin/code.api';
import { Accordion } from '@/components/ui/accordion';

import { AdminCodeGroupAccordionItem } from './AdminCodeGroupAccordionItem';

export function AdminCodesAccordion() {
  const [codeGroups, setCodeGroups] = useState<CodeGroup[]>([]);
  console.log(codeGroups);

  useEffect(() => {
    getAdminCodeGroupsAPI().then(res => {
      setCodeGroups(res.data);
    });
  }, []);
  return (
    <Accordion type="multiple" className="w-full">
      {codeGroups.map(codeGroup => (
        <AdminCodeGroupAccordionItem key={codeGroup.id} codeGroup={codeGroup} />
      ))}
    </Accordion>
  );
}
