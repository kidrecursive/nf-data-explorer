import { getClient } from '@/services/BaseService';
import { handleServiceError } from '@/utils/service-utils';

export async function insertAstraDBConfig(
  applicationToken: string,
  bundleFile: any,
): Promise<void> {
  const formData = new FormData();
  formData.append('applicationToken', applicationToken);
  formData.append('file', bundleFile);

  try {
    const result = await getClient().post(`/REST/env/astradb`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return result.data;
  } catch (err) {
    throw handleServiceError(err);
  }
}
