import { ResponsiveHeader } from "@/components/ui/responsive-header"
import { MainFooter } from "@/components/ui/main-footer"

export default function AvisoPrivacidadPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <ResponsiveHeader />

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container-responsive text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-600 mb-4">
            Aviso de Privacidad
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Información sobre el tratamiento de sus datos personales por Finkargo Colombia S.A.S.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            
            <div className="mb-8">
              <p className="mb-6">
                De conformidad con lo dispuesto en la Ley Estatutaria 1581 de 2012 por la cual se dictan disposiciones generales para la protección de Datos Personales, sus decretos reglamentarios y demás normas que la modifiquen (la "Ley Aplicable"), Finkargo Colombia S.A.S., sociedad comercial, debidamente constituida y válidamente existente de conformidad con las leyes de Colombia, identificada con NIT. 901.456.364-1 ("Finkargo"), informa a sus trabajadores, clientes, proveedores y terceros y en general a todos los Titulares de información personal que hayan facilitado o que en el futuro faciliten sus datos, que estos serán incorporados en las Bases de Datos propiedad de Finkargo.
              </p>
              <p className="mb-6">
                Finkargo podrá utilizar, sin previa autorización del Titular, información de carácter personal siempre y cuando la misma sea de naturaleza pública. Se deberá entender por Datos Personales Públicos son aquellos que se encuentran contenidos en documentos públicos, sentencias judiciales debidamente ejecutoriadas que no estén sometidos a reserva y los relativos al estado civil de las personas.
              </p>
              <p className="mb-8">
                Para efectos de este Aviso de Privacidad, los términos en mayúscula tendrán el significado que a los mismos se le asigna en la Ley Aplicable.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-600 mb-6">TRATAMIENTO Y FINALIDAD</h2>
            <p className="mb-6">
              Los Titulares de la información de carácter personal a través de su consentimiento aceptan libre, expresa, previa y de forma inequívoca que sus Datos Personales y Datos Personales Sensibles serán recolectados, almacenados, procesados, usados, suprimidos, Transmitidos y/o Transferidos a terceros. Los datos suministrados serán utilizados para llevar a cabo las siguientes finalidades:
            </p>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Clientes/Usuarios</h3>
            <ul className="list-disc pl-6 space-y-1 mb-6">
              <li>Otorgar facturas, pagarés y demás títulos valores, así como cualquier otro acto cuya circulación sea permitida por la legislación colombiana.</li>
              <li>Realizar operaciones de cesión de derechos económicos y/o de transferencia de Instrumentos de Pago (tal y como dicho término se define en el Contrato Marco para la Realización de Operaciones de Compraventa de Instrumento suscrito con Finkargo).</li>
              <li>Ejecutar de actividades para el análisis de riesgo operativo, financiero y de concentración por mercado.</li>
              <li>Realizar comparativas de similitudes en operaciones internacionales.</li>
              <li>Contactar a través de medios telefónicos, electrónicos (SMS o chat) o correos electrónicos, para gestionar las actividades de mercadeo, publicidad y relacionamiento con los clientes, incluyendo planes de fidelización, recordación de vencimientos, renovaciones y comunicación sobre productos y servicios actuales y nuevos, así como beneficios e información que pueda ser de interés para los clientes.</li>
              <li>Desarrollar actividades de segmentación, clustering y otros análisis asociados.</li>
              <li>Realizar encuestas de satisfacción y percepción sobre los servicios y productos ofrecidos por Finkargo.</li>
              <li>Tramitar y gestionar de peticiones, quejas, reclamos y solicitudes de los clientes y/o ciudadanos.</li>
              <li>Manejar información por parte de terceros para las gestiones comerciales, o servicios tercerizados por parte de Finkargo.</li>
              <li>Realizar gestiones y/o trámites internos necesarios para acatar la legislación colombiana relacionados y/o derivados de los servicios y/o productos ofrecidos por Finkargo.</li>
              <li>Enviar información editorial, comercial, promocional, invitaciones o atenciones de Finkargo.</li>
              <li>Realizar estudios de mercado y hábitos de comportamiento.</li>
              <li>Efectuar consultas, reportes y actualizaciones en diferentes listas restrictivas y bancos de datos del comportamiento y crédito comercial.</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Proveedores</h3>
            <ul className="list-disc pl-6 space-y-1 mb-6">
              <li>Dar trámite al objeto de los procesos de selección y contratación.</li>
              <li>Gestionar la documentación y evaluar el servicio de los proveedores.</li>
              <li>Adelantar los procesos de control, auditoría interna, externa y seguridad de la información.</li>
              <li>Administrar, gestionar y controlar los proveedores, así como mantener la información de contacto actualizada para todos los fines contractuales que garanticen la óptima ejecución de los contratos.</li>
              <li>Realizar todas las gestiones y/o trámites internos para acatar la legislación en virtud de la prestación del servicio contratado.</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Candidatos/Empleados/Practicantes y aprendices</h3>
            <ul className="list-disc pl-6 space-y-1 mb-6">
              <li>Desarrollar el proceso de reclutamiento, selección, evaluación y vinculación laboral, así como la verificación de los soportes documentales compartidos por los candidatos de forma previa a su vinculación. Incluye verificaciones de seguridad tales como certificaciones laborales, referencias laborales y personales, antecedentes judiciales y consultas en centrales de crédito, así como cualquier otra validación de información realizada con el fin de fortalecer las garantías de seguridad en los procesos de vinculación de personal.</li>
              <li>Enviar información editorial, comercial, promocional, invitaciones o atenciones de Finkargo.</li>
              <li>Realizar estudios y análisis estadísticos.</li>
              <li>Registrar y mantener datos históricos de la información de empleados y/o pensionados (activos o inactivos) en las Bases de Datos.</li>
              <li>Suministrar, compartir, enviar y entregar los Datos Personales del candidato y/o empleado para realizar actividades relacionadas con: estudios de seguridad, accidentes laborales, vinculación a seguridad social, encuestas de clima organizacional, entre otras.</li>
              <li>Suministrar, compartir, enviar y entregar los Datos Personales del empleado a empresas filiales o vinculadas a Finkargo ubicadas en Colombia o cualquier otro país en el evento que dichas empresas requieran la información para el objeto social de Finkargo.</li>
              <li>Dar cumplimiento a las obligaciones contraídas, con relación al pago de salarios, prestaciones sociales y demás retribuciones consagradas en el contrato de trabajo o según lo disponga la legislación colombiana.</li>
              <li>Ofrecer programas de bienestar corporativo y planificar actividades empresariales, para el Titular y sus beneficiarios (hijos, cónyuge, compañero permanente).</li>
              <li>Respaldar las actividades de seguridad y salud en el trabajo, formación y promoción del personal, así como cualquier actividad enmarcada en el desarrollo de la organización y su equipo de trabajo.</li>
              <li>Emitir recomendaciones o referencias laborales una vez se culmine la relación contractual.</li>
              <li>Asegurar el cumplimiento de los acuerdos de confidencialidad.</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Datos Sensibles</h3>
            <ul className="list-disc pl-6 space-y-1 mb-6">
              <li>Adelantar los procesos legales, auditorías internas y externas.</li>
              <li>Recolectar datos en los puntos de seguridad, tomados de los documentos que suministran las personas a los guardias de seguridad, obtenidos de las videograbaciones que se realizan dentro o fuera de las instalaciones del Finkargo, éstos se utilizarán para fines de seguridad de las personas, los bienes e instalaciones del Finkargo y podrán ser utilizados como prueba en cualquier tipo de proceso.</li>
              <li>Desarrollar actividades de mercadeo como: eventos, paneles y estudios de mercado.</li>
              <li>Efectuar las gestiones pertinentes para el desarrollo del objeto social de Finkargo en lo que tiene que ver con el cumplimiento del objeto del contrato celebrado con el Titular.</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Menores de edad</h3>
            <ul className="list-disc pl-6 space-y-1 mb-6">
              <li>Acceder a los beneficios o derechos en salud, recreación, cultura, educación y demás programas o actividades con Finkargo y/o aquellos terceros con los cuales Finkargo establezcan convenios afines a dicho fin.</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Para el resto de los casos</h3>
            <ul className="list-disc pl-6 space-y-1 mb-6">
              <li>Adelantar los procesos legales, auditorías internas y externas.</li>
              <li>Recolectar datos en los puntos de seguridad, tomados de los documentos que suministran las personas a los guardias de seguridad, obtenidos de las videograbaciones que se realizan dentro o fuera de las instalaciones del Finkargo, éstos se utilizarán para fines de seguridad de las personas, los bienes e instalaciones de Finkargo y podrán ser utilizados como prueba en cualquier tipo de proceso.</li>
              <li>Desarrollar actividades de mercadeo como: eventos, paneles y estudios de mercado.</li>
            </ul>
            <p className="mb-8">
              Salvo por los Datos Personales de menores de edad, la información recolectada podrá ser transferida a terceros, siempre y cuando no contravenga los contratos establecidos entre las partes, a quienes se les exigirá los procedimientos de Tratamiento que establece la legislación colombiana.
            </p>

            <h2 className="text-2xl font-bold text-gray-600 mb-6">DERECHOS DEL TITULAR DE LA INFORMACIÓN</h2>
            <p className="mb-6">
              Teniendo en cuenta lo anterior y con pleno conocimiento de estar compartiendo mi información personal, conozco y acepto que Finkargo realizará el Tratamiento de mi información personal incorporada en la base de datos de Finkargo y a utilizarla para las finalidades ya descritas, asegurando el cumplimiento de los siguientes derechos que asisten como Titular de los Datos Personales:
            </p>

            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Acceder en forma gratuita a los Datos Personales proporcionados que hayan sido objeto de Tratamiento. La información solicitada por el Titular podrá ser suministrada por cualquier medio, incluyendo los electrónicos, según lo requiera el Titular. La información deberá ser de fácil lectura, sin barreras técnicas que impidan su acceso y deberá corresponder en todo a aquella que repose en la Base de Datos de Finkargo.</li>
              <li>Conocer, actualizar y rectificar los Datos Personales que hayan sido proporcionados de manera parcial, inexacta, incompleta, fraccionada y/o que puedan inducir al error, y/o aquellos cuyo Tratamiento esté prohibido o no haya sido autorizado Para el ejercicio de estos derechos será necesario establecer previamente la identificación de la persona para evitar que terceros no autorizados accedan a los Datos Personales del Titular.</li>
              <li>Solicitar la copia de la Autorización otorgada a Finkargo salvo cuando el Tratamiento, de conformidad con la ley, no lo requiera.</li>
              <li>Recibir información sobre el uso que Finkargo ha dado a los Datos Personales del Titular.</li>
              <li>Presentar ante la Superintendencia de Industria y Comercio ("SIC") quejas por infracciones a lo dispuesto en la ley y las demás normas que la modifiquen, adicionen o complementen.</li>
              <li>Acceder a la solicitud de revocatoria de la Autorización y/o supresión del Dato Personal cuando la SIC haya determinado que en el Tratamiento por parte de Finkargo se ha incurrido en conductas contrarias a la Ley 1581 de 2012 o a la Constitución y, en ese sentido, revocar la Autorización y solicitar la supresión del Dato Personal. Sin perjuicio de lo anterior, la solicitud de supresión y la revocatoria de la Autorización no procederán cuando el Titular tenga un deber legal o contractual de permanecer en la Base de Datos de Finkargo como Responsable y/o Encargado del Tratamiento.</li>
              <li>Abstenerse de responder las preguntas sobre Datos Personales Sensibles. El Titular de dichos Datos Personales Sensibles con la libertad de decidir si desea proporcionar o no esta información a Finkargo.</li>
            </ul>

            <p className="mb-4">Los derechos de los titulares podrán ejercerse por las siguientes personas:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Titular, quien deberá acreditar su identidad en forma suficiente por los distintos medios que le ponga a disposición de Finkargo, la cual, para el efecto podrá mantener mecanismos de validación de la información.</li>
              <li>Representante y/o apoderado del titular, previa acreditación de la representación o apoderamiento.</li>
              <li>Los derechos de los niños, niñas o adolescentes se ejercerán por las personas que estén facultadas para representarlos y lo prueben a través del registro civil del menor o documento judicial que demuestre su calidad.</li>
            </ul>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mt-8">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Contacto para ejercer derechos</h3>
              <p className="text-blue-700 mb-2">
                Para el ejercicio de estos derechos puede contactar con Finkargo por medio del siguiente correo electrónico:
              </p>
              <p className="text-blue-700 font-bold">
                contacto@finkargo.com
              </p>
            </div>

          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  )
}