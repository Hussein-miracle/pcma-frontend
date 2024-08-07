import { errorToast } from '@/lib/utils';
import { useState } from 'react';
import { toast } from 'react-toastify';

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // Return success

export function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy: CopyFn = async (text) => {
    if (!text) return false;

    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      errorToast('Clipboard not supported');

      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      toast.info('Copied to clipboard');
      return true;
    } catch (error) {
      console.warn('Copy failed', error);
      errorToast('Copy failed');
      setCopiedText(null);
      return false;
    }
  };

  return [copiedText, copy];
}
