import { ResponsiveHeader } from "@/components/ui/responsive-header"
import { MainFooter } from "@/components/ui/main-footer"

export default function DatosPersonalesPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <ResponsiveHeader />

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container-responsive text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-600 mb-4">
            Autorización para el Tratamiento de Datos Personales
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Información sobre la autorización para el procesamiento de datos personales por Finkargo Colombia S.A.S.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            
            <div className="mb-8">
              <p className="mb-6">
                Manifiesto que fui informado de que, en caso de recolección de mi información sensible, tengo derecho a, (i) contestar o no las preguntas que Finkargo Colombia S.A.S., sociedad comercial, debidamente constituida y válidamente existente de conformidad con las leyes de Colombia, identificada con NIT. 901.456.364-1 ("Finkargo") me formule; y (ii) entregar o no los datos solicitados por Finkargo.
              </p>
              
              <p className="mb-8">
                Adicionalmente, (i) entiendo que los datos sensibles son aquellos que afectan mi intimidad como titular de los mismos y que su uso indebido puede generar discriminación; y (ii) reconozco que fui informado que Finkargo utilizará mis datos sensibles, de acuerdo con las finalidades descritas a continuación:
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-600 mb-6">Finalidades del Tratamiento</h2>
            <ul className="list-disc pl-6 space-y-3 mb-8">
              <li>Controlar el acceso a las instalaciones y el uso de productos y servicios basados en nuevas tecnologías.</li>
              <li>Validar la identidad del cliente, empleado o proveedor con relación contractual vigente.</li>
              <li>Efectuar las gestiones pertinentes para el desarrollo del objeto social de Finkargo en lo que tiene que ver con el cumplimiento del objeto del contrato celebrado.</li>
            </ul>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-8">
              <h3 className="text-xl font-semibold text-green-800 mb-3">Autorización Explícita</h3>
              <p className="text-green-700">
                Por lo anterior, autorizo de forma explícita el tratamiento de mis datos sensibles a Finkargo, para que como responsable del tratamiento de mis datos personales, recolecte, almacene, use, suprima, transmita y/o transfiera a terceros, cuando sean requeridos como parte de la relación legal, comercial, contractual y/o cualquier otra que surja.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-600 mb-6">Derechos del Titular</h2>
            <p className="mb-6">
              Adicionalmente, declaro que conozco todos los derechos que me asisten como titular de la información, los cuales son los previstos en la Constitución Política y la Ley 1581 de 2012, especialmente los siguientes:
            </p>
            
            <div className="grid md:grid-cols-1 gap-4 mb-8">
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>(i)</strong> acceder en forma gratuita a los datos proporcionados que hayan sido objeto de tratamiento;</li>
                <li><strong>(ii)</strong> conocer, actualizar y rectificar mi información frente a datos parciales, inexactos, incompletos, fraccionados, que induzcan a error, o a aquellos cuyo tratamiento esté prohibido o no haya sido autorizado;</li>
                <li><strong>(iii)</strong> solicitar prueba de la autorización otorgada;</li>
                <li><strong>(iv)</strong> presentar ante la Superintendencia de Industria y Comercio quejas por infracciones a lo dispuesto en la normatividad vigente;</li>
                <li><strong>(v)</strong> revocar la autorización y/o solicitar la supresión del dato, siempre que no exista un deber legal o contractual que impida eliminarlos;</li>
                <li><strong>(vi)</strong> abstenerme de responder las preguntas sobre Datos Sensibles.</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-3">Ejercicio de Derechos</h3>
              <p className="text-gray-700 mb-3">
                Mis derechos los podré ejercer por correo electrónico siguiendo el procedimiento establecido en la Política de Privacidad de Finkargo, escribiendo a la siguiente dirección de correo electrónico:
              </p>
              <p className="text-gray-700 font-bold mb-3">
                contacto@finkargo.com
              </p>
              <p className="text-gray-700">
                Manifiesto que conozco que la Política de Privacidad de Finkargo podrá ser consultada en https://www.finkargo.com/es/privacypolicy/.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-8">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Fecha de Actualización</h3>
              <p className="text-blue-700">
                <strong>Fecha de última actualización:</strong> 18 de agosto de 2023
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-3">Información de Contacto</h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                <div>
                  <p className="font-semibold mb-2">Responsable del Tratamiento:</p>
                  <p>Finkargo Colombia S.A.S.</p>
                  <p>NIT: 901.456.364-1</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Datos de Contacto:</p>
                  <p>Email: contacto@finkargo.com</p>
                  <p>Dirección: Cl. 87 No. 12-11, Bogotá D.C., Colombia</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  )
}