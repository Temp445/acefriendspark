import { z } from 'zod';
import { TemplateMeta } from '../types';

const enquirySchema = z.object({
    originateFrom: z.string(),
    fullName: z.string(),
    emailId: z.string().email(),
    mobileNumber: z.string(),
    checkIn: z.string(),
    checkOut: z.string(),
    guests: z.string(),
    cottages: z.string(),
});

export type EnquiryData = z.infer<typeof enquirySchema>;

export const enquiryTemplateMeta: TemplateMeta<EnquiryData> = {
    templateId: 'enquiry_form',
    name: 'Enquiry Form',
    placeholders: [
        'originateFrom',
        'fullName',
        'emailId',
        'mobileNumber',
        'checkIn',
        'checkOut',
        'guests',
        'cottages'
        // optional: 'submittedAt'
    ],
    schema: enquirySchema,
    componentsMap: [
        { key: 'originateFrom', type: 'text', component: 'body' },
        { key: 'fullName', type: 'text', component: 'body' },
        { key: 'emailId', type: 'text', component: 'body' },
        { key: 'mobileNumber', type: 'text', component: 'body' },
        { key: 'checkIn', type: 'text', component: 'body' },
        { key: 'checkOut', type: 'text', component: 'body' },
        { key: 'guests', type: 'text', component: 'body' },
        { key: 'cottages', type: 'text', component: 'body' },
    ]
};