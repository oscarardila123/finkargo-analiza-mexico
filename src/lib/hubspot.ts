/**
 * HubSpot CRM Integration
 *
 * This module handles integration with HubSpot CRM API to track registered users
 * and their company information for full lead tracking and sales funnel management.
 */

const HUBSPOT_API_BASE = 'https://api.hubapi.com'
const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN

interface HubSpotContactProperties {
  email: string
  firstname?: string
  lastname?: string
  phone?: string
  company?: string
  city?: string
  website?: string
  lifecyclestage?: string
  // Custom properties
  company_email?: string // Email empresarial (debe crearse en HubSpot)
  user_role?: string
}

interface CreateContactResponse {
  id: string
  properties: Record<string, string>
  createdAt: string
  updatedAt: string
  archived: boolean
}

/**
 * Creates a contact in HubSpot CRM
 *
 * @param properties - Contact properties including email (required), firstname, lastname, etc.
 * @returns Created contact data or null if failed
 */
export async function createHubSpotContact(
  properties: HubSpotContactProperties
): Promise<CreateContactResponse | null> {
  // Skip if HubSpot is not configured
  if (!HUBSPOT_ACCESS_TOKEN) {
    console.warn('⚠️ HubSpot access token not configured. Skipping contact creation.')
    return null
  }

  try {
    console.log('📤 Creating HubSpot contact:', properties.email)

    const response = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))

      // Handle duplicate email error gracefully
      if (response.status === 409) {
        console.log('ℹ️ Contact already exists in HubSpot:', properties.email)
        // Optionally update the existing contact instead
        return await updateHubSpotContactByEmail(properties)
      }

      console.error('❌ HubSpot API error:', response.status, errorData)
      return null
    }

    const contact = await response.json()
    console.log('✅ HubSpot contact created successfully:', contact.id)

    return contact
  } catch (error) {
    console.error('❌ Error creating HubSpot contact:', error)
    return null
  }
}

/**
 * Updates an existing contact in HubSpot by email
 *
 * @param properties - Contact properties to update
 * @returns Updated contact data or null if failed
 */
async function updateHubSpotContactByEmail(
  properties: HubSpotContactProperties
): Promise<CreateContactResponse | null> {
  if (!HUBSPOT_ACCESS_TOKEN) {
    return null
  }

  try {
    // First, search for the contact by email
    const searchResponse = await fetch(
      `${HUBSPOT_API_BASE}/crm/v3/objects/contacts/search`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filterGroups: [
            {
              filters: [
                {
                  propertyName: 'email',
                  operator: 'EQ',
                  value: properties.email,
                },
              ],
            },
          ],
        }),
      }
    )

    if (!searchResponse.ok) {
      console.error('❌ Error searching for HubSpot contact')
      return null
    }

    const searchData = await searchResponse.json()

    if (searchData.results && searchData.results.length > 0) {
      const contactId = searchData.results[0].id

      // Update the contact
      const updateResponse = await fetch(
        `${HUBSPOT_API_BASE}/crm/v3/objects/contacts/${contactId}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ properties }),
        }
      )

      if (updateResponse.ok) {
        const updatedContact = await updateResponse.json()
        console.log('✅ HubSpot contact updated successfully:', contactId)
        return updatedContact
      }
    }

    return null
  } catch (error) {
    console.error('❌ Error updating HubSpot contact:', error)
    return null
  }
}

/**
 * Creates a company in HubSpot CRM
 *
 * @param properties - Company properties
 * @returns Created company data or null if failed
 */
export async function createHubSpotCompany(properties: {
  name: string
  domain?: string
  city?: string
  phone?: string
  country?: string
  nit?: string // Se mapeará a tax_id___final
}): Promise<{ id: string } | null> {
  if (!HUBSPOT_ACCESS_TOKEN) {
    console.warn('⚠️ HubSpot access token not configured. Skipping company creation.')
    return null
  }

  try {
    console.log('📤 Creating HubSpot company:', properties.name)

    // Mapear nit a tax_id___final (propiedad estándar de HubSpot)
    const hubspotProperties: Record<string, any> = {
      name: properties.name,
      domain: properties.domain,
      city: properties.city,
      phone: properties.phone,
      country: properties.country,
      // Propiedad para disparar workflow de creación de Deal en funnel de Analiza
      form_nueva_landing_analiza: true,
    }

    // Mapear NIT a tax_id___final
    if (properties.nit) {
      hubspotProperties.tax_id___final = properties.nit
    }

    let response = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/companies`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties: hubspotProperties }),
    })

    // Si falla por validación de tax_id, reintentar sin el NIT
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))

      // Si el error es por formato de NIT, reintentar sin él
      if (errorData.category === 'VALIDATION_ERROR' && errorData.message?.includes('tax_id')) {
        console.log('⚠️ Tax ID format invalid, retrying without it...')
        delete hubspotProperties.tax_id___final

        response = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/companies`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ properties: hubspotProperties }),
        })

        if (!response.ok) {
          const retryError = await response.json().catch(() => ({}))
          console.error('❌ HubSpot company creation error:', response.status, retryError)
          return null
        }
      } else {
        console.error('❌ HubSpot company creation error:', response.status, errorData)
        return null
      }
    }

    const company = await response.json()
    console.log('✅ HubSpot company created successfully:', company.id)

    return company
  } catch (error) {
    console.error('❌ Error creating HubSpot company:', error)
    return null
  }
}

/**
 * Associates a contact with a company in HubSpot
 *
 * @param contactId - HubSpot contact ID
 * @param companyId - HubSpot company ID
 * @returns Success status
 */
export async function associateContactWithCompany(
  contactId: string,
  companyId: string
): Promise<boolean> {
  if (!HUBSPOT_ACCESS_TOKEN) {
    return false
  }

  try {
    const response = await fetch(
      `${HUBSPOT_API_BASE}/crm/v3/objects/contacts/${contactId}/associations/companies/${companyId}/contact_to_company`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
        },
      }
    )

    if (response.ok) {
      console.log('✅ Contact associated with company in HubSpot')
      return true
    }

    return false
  } catch (error) {
    console.error('❌ Error associating contact with company:', error)
    return false
  }
}

/**
 * Helper function to create a complete user registration in HubSpot
 * Creates both contact and company, and associates them
 *
 * @param userData - User registration data
 * @returns Object with contact and company IDs
 */
export async function createHubSpotRegistration(userData: {
  // User data
  name: string
  email: string
  phone?: string
  // Company data
  companyName: string
  companyEmail: string
  nit?: string
  city?: string
  website?: string
  country?: string
}) {
  // Split name into firstname and lastname
  const nameParts = userData.name.trim().split(' ')
  const firstname = nameParts[0] || ''
  const lastname = nameParts.slice(1).join(' ') || ''

  // Create contact
  const contact = await createHubSpotContact({
    email: userData.email,
    firstname,
    lastname,
    phone: userData.phone,
    company: userData.companyName,
    city: userData.city,
    website: userData.website,
    lifecyclestage: 'lead', // New registration = lead
    company_email: userData.companyEmail, // Propiedad personalizada (debe crearse en HubSpot)
  })

  // Create company
  const company = await createHubSpotCompany({
    name: userData.companyName,
    domain: userData.website,
    city: userData.city,
    phone: userData.phone,
    country: userData.country || 'México',
    nit: userData.nit,
  })

  // Associate contact with company if both were created
  if (contact?.id && company?.id) {
    await associateContactWithCompany(contact.id, company.id)
  }

  return {
    contactId: contact?.id || null,
    companyId: company?.id || null,
  }
}
