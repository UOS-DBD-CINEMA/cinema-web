import { Button } from '@ui/button';
import { XIcon } from 'lucide-react';

import { CodeDetail, deleteAdminCodeDetailAPI } from '@/api/admin/code.api';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type AdminDelCodeDetailDialogProps = {
  codeDetail: CodeDetail;
  codeDetails: CodeDetail[];
  setCodeDetails: React.Dispatch<React.SetStateAction<CodeDetail[]>>;
};

export function AdminDelCodeDetailDialog({
  codeDetail,
  codeDetails,
  setCodeDetails,
}: AdminDelCodeDetailDialogProps) {
  const handleDelete = () => {
    deleteAdminCodeDetailAPI(codeDetail.id).then(() => {
      setCodeDetails(codeDetails.filter(cd => cd.id !== codeDetail.id));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <XIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-sm">
        <DialogHeader>
          <DialogTitle>데이터 손실 위험</DialogTitle>
          <DialogDescription>
            CodeDetail {codeDetail.value}를 정말로 삭제하시겠습니까?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">취소하기</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleDelete}>삭제하기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
