import { MainHeader } from "@/components/ui/main-header"
import { MainFooter } from "@/components/ui/main-footer"

export default function DatosSensiblesPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <MainHeader />

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container-responsive text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-600 mb-4">
            Autorización para el Tratamiento de Datos Sensibles
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Información sobre el tratamiento de datos sensibles por Finkargo México
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 mb-8">
              <h3 className="text-xl font-semibold text-yellow-800 mb-3">Información Important</h3>
              <p className="text-yellow-700">
                Este documento describe sus derechos respecto al tratamiento de datos sensibles y la autorización 
                voluntaria para su procesamiento.
              </p>
            </div>

            <div className="mb-8">
              <p className="mb-6">
                Manifiesto que fui informado de que, en caso de recolección de mi información sensible, tengo derecho a, (i) contestar o no las preguntas que Finkargo México, S.A.P.I. de C.V., SOFOM, E.N.R., sociedad comercial debidamente constituida y válidamente existente de conformidad con las leyes de México ("Finkargo") me formule; y (ii) entregar o no los datos solicitados por Finkargo.
              </p>
              
              <p className="mb-8">
                Adicionalmente, (i) entiendo que los datos sensibles son aquellos que afectan mi intimidad como titular de los mismos y que su uso indebido puede generar discriminación, por lo anterior, reconozco que he sido informado que no estoy en la obligación de suministrar datos sensibles y que ninguna actividad se condicionará a la entrega de éstos; y (ii) reconozco que fui informado de que Finkargo utilizará mis datos sensibles, de acuerdo con las finalidades descritas a continuación:
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-600 mb-6">Finalidades del Tratamiento de Datos Sensibles</h2>
            <ul className="list-disc pl-6 space-y-3 mb-8">
              <li>Controlar el acceso a las instalaciones y el uso de productos y servicios basados en nuevas tecnologías.</li>
              <li>Validar la identidad del cliente, empleado o proveedor con relación contractual vigente.</li>
              <li>Efectuar las gestiones pertinentes para el desarrollo del objeto social de Finkargo en lo que tiene que ver con el cumplimiento del objeto del contrato celebrado.</li>
            </ul>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-8">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Autorización</h3>
              <p className="text-blue-700 mb-4">
                Por lo anterior, autorizo de forma explícita el tratamiento de mis datos sensibles a Finkargo, para que como responsable del tratamiento de mis datos personales, recolecte, almacene, use, suprima, transmita y/o transfiera a terceros, cuando sean requeridos como parte de la relación legal, comercial, contractual y/o cualquier otra que surja.
              </p>
              <p className="text-blue-700">
                Así mismo, autorizo a que mi información sea almacenada y procesada en servidores dentro y fuera de México.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-600 mb-6">Derechos del Titular</h2>
            <p className="mb-4">
              Reconozco que he sido debidamente informado que mis derechos como Titular de Datos Personales son los establecidos en la Constitución Política y en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, especialmente los siguientes:
            </p>
            
            <div className="grid md:grid-cols-1 gap-4 mb-8">
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Acceso gratuito:</strong> Acceder en forma gratuita a los datos proporcionados que hayan sido objeto de tratamiento.</li>
                <li><strong>Actualización y rectificación:</strong> Conocer, actualizar y rectificar mi información frente a datos parciales, inexactos, incompletos, fraccionados, que induzcan a error, o a aquellos cuyo tratamiento esté prohibido o no haya sido autorizado.</li>
                <li><strong>Solicitud de prueba:</strong> Solicitar prueba de la autorización otorgada.</li>
                <li><strong>Presentación de quejas:</strong> Presentar ante el Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI) quejas por infracciones a lo dispuesto en la normatividad vigente.</li>
                <li><strong>Revocación:</strong> Revocar la autorización y/o solicitar la supresión del dato, siempre que no exista un deber legal o contractual que impida eliminarlos.</li>
                <li><strong>Abstención:</strong> Abstenerme de responder las preguntas sobre Datos Sensibles.</li>
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

            <div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-8">
              <h3 className="text-xl font-semibold text-green-800 mb-3">Declaración de Consentimiento</h3>
              <p className="text-green-700">
                La presente autorización me fue solicitada y puesta de presente antes de entregar mis datos y la suscribo de forma libre y voluntaria una vez leída en su totalidad.
              </p>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h3 className="text-xl font-semibold text-red-800 mb-3">Recordatorio Importante</h3>
              <p className="text-red-700 mb-2">
                <strong>Sus derechos fundamentales:</strong>
              </p>
              <ul className="list-disc pl-6 text-red-700 space-y-1">
                <li>No está obligado a proporcionar datos sensibles</li>
                <li>Ninguna actividad se condicionará a la entrega de estos datos</li>
                <li>Puede revocar su autorización en cualquier momento</li>
                <li>Tiene derecho a conocer cómo se usan sus datos</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  )
}