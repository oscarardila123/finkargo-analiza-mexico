import { MainHeader } from "@/components/ui/main-header"
import { MainFooter } from "@/components/ui/main-footer"

export default function TerminosCondicionesPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <MainHeader />

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container-responsive text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-600 mb-4">
            Términos y Condiciones
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Finkargo Analiza México
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Términos y condiciones que regulan los servicios prestados por Finkargo México
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-8">
              <p className="text-blue-800 mb-0">
                El presente documento contiene los términos y condiciones (los "Términos y Condiciones")
                que regulan los Servicios (según dicho término se define más adelante) prestados por Finkargo en el marco
                del producto Finkargo Analiza.
              </p>
            </div>

            {/* CLÁUSULA I */}
            <h2 className="text-2xl font-bold text-gray-600 mb-6 mt-12">CLÁUSULA I - INTERPRETACIÓN; DEFINICIONES</h2>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección 1.01 - Interpretación</h3>
            <div className="mb-6 space-y-4">
              <p><strong>(a)</strong> Estos Términos y Condiciones constituyen la regularización y gestión de la contratación de los Servicios por parte del Usuario (según dichos términos se define más adelante).</p>
              <p><strong>(b)</strong> El Usuario reconoce, declara y acepta que, ya sea mediante, (i) la firma de los presentes Términos y Condiciones; y/o (ii) la contratación de los Servicios a través de la firma de la Cotización de Compra (según dicho término se define más adelante), se entenderá que el Usuario ha leído y aceptado los presentes Términos y Condiciones en su totalidad.</p>
              <p><strong>(c)</strong> La referencia a cualquier Cláusula o Sección que en estos Términos y Condiciones se realice se entenderá como una referencia a la correspondiente Cláusula o Sección de los mismos.</p>
            </div>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección 1.02 - Definiciones</h3>
            <div className="mb-8 space-y-3 bg-gray-50 p-6 rounded-lg">
              <p><strong>"Afiliadas"</strong> significa, en relación con cualquier persona moral, (a) cualquier subordinada, filial o subsidiaria, directa o indirecta, de tal persona moral; y (b) cualquier otra persona moral o física que directa o indirectamente controle a, sea controlada por, o se encuentre bajo control común con tal persona moral.</p>

              <p><strong>"Botón de Soporte"</strong> significa el ícono de ayuda en la Plataforma a través del cual el Usuario podrá solicitar el soporte ante cualquier Incidente.</p>

              <p><strong>"Compra de Reporte Único de Información"</strong> significa la compra realizada por el Usuario, a través de la Plataforma o de la manera que Finkargo mejor considere, del Reporte Único de Información.</p>

              <p><strong>"Cotización de Compra"</strong> significa la cotización de compra enviada por Finkargo al Usuario para la adquisición de los Servicios durante la Suscripción Anual o la compra de uno o varios Reportes Únicos de Información, según aplique, en la cual Finkargo establecerá los términos de la prestación de los Servicios o la entrega de los Reportes Únicos de Información, según aplique, así como el Precio a pagar por ellos.</p>

              <p><strong>"Credenciales"</strong> significa el usuario y contraseña que Finkargo proporciona al Usuario para acceder a la Plataforma, las cuales deberán ser actualizadas de tiempo en tiempo según indique la Plataforma al Usuario durante la Suscripción Anual.</p>

              <p><strong>"Datos Personales"</strong> significa cualquier información concerniente a una persona física identificada o identificable de acuerdo a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.</p>

              <p><strong>"Finkargo"</strong> significa, de manera indistinta, Finkargo México, S.A.P.I. de C.V., SOFOM, E.N.R. o cualquiera de sus Afiliadas.</p>

              <p><strong>"Incidente"</strong> significa cualquier error, falla o desperfecto encontrado en el funcionamiento de la Plataforma.</p>

              <p><strong>"Información"</strong> significa la información que, (a) arrojará la Plataforma al Usuario; y/o (b) es entregada por Finkargo al Usuario en los Reportes Únicos de Información, en ambos casos relativa a datos de México de importaciones, exportaciones y pedimentos de los años 2023 y 2024 y las actualizaciones a que haya lugar.</p>

              <p><strong>"Plataforma"</strong> significa la infraestructura tecnológica desarrollada por Finkargo para que el Usuario acceda a consultar la Información y los datos constitutivos de ésta en tiempo real, con actualizaciones periódicas y la posibilidad de realizar búsquedas personalizadas según diversos criterios (i.e. fechas, tipos de productos, destinos, aranceles, etc.), disponible a través del sitio web <a href="https://www.finkargo.com/mx/" className="text-blue-600 hover:underline">https://www.finkargo.com/mx/</a> o a través de cualquier otro medio que Finkargo disponga.</p>

              <p><strong>"Política de Privacidad"</strong> significa la política de privacidad de Finkargo disponible en <a href="https://www.finkargo.com/mx/politicas_privacidad_mx/" className="text-blue-600 hover:underline">https://www.finkargo.com/mx/politicas_privacidad_mx/</a>.</p>

              <p><strong>"Precio"</strong> significa la contraprestación que deberá pagar el Usuario a Finkargo por la prestación de los Servicios o la Compra de Reportes Únicos de Información, según se establezca la Cotización de Compra correspondiente.</p>

              <p><strong>"Reporte Único de Información"</strong> significa el reporte único de Información emitido por Finkargo con destino al Usuario de acuerdo con las especificaciones que para tales efectos entregue el Usuario a Finkargo a través de la Plataforma o cualquier otro medio que Finkargo determine para ello.</p>

              <p><strong>"Servicios"</strong> significa los servicios de computación en la nube y funcionalidades relacionadas, a los cuales el Usuario tendrá acceso a través de la Plataforma, con el fin de realizar consultas relativas y/o relacionadas con la cadena de comercio exterior en México, incluyendo, pero sin limitarse, (a) datos estadísticos; (b) datos operativos; (c) información sobre transacciones comerciales; (d) documentación aduanera; y (e) registros de actividades logísticas vinculadas a dichos movimientos.</p>

              <p><strong>"Suscripción Anual"</strong> significa la suscripción realizada por el Usuario en la Plataforma, por un periodo de 12 (doce) meses contados a partir del recibo por parte de Finkargo, a su entera satisfacción, del Precio por parte del Usuario.</p>

              <p><strong>"Tratamiento"</strong> significa la obtención, uso, divulgación o almacenamiento de Datos Personales, por cualquier medio. El uso abarca cualquier acción de acceso, manejo, aprovechamiento, transferencia o disposición de datos personales.</p>

              <p><strong>"Usuario"</strong> significa la persona física o moral a la que Finkargo le prestara los Servicios conforme a lo establecido en los presentes Términos y Condiciones.</p>
            </div>

            {/* CLÁUSULA II */}
            <h2 className="text-2xl font-bold text-gray-600 mb-6 mt-12">CLÁUSULA II - SERVICIOS; COMPRA DE REPORTES ÚNICOS DE INFORMACIÓN</h2>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección 2.01 - Servicios</h3>
            <div className="mb-6 space-y-4">
              <p><strong>(a) Prestación de los Servicios.</strong> En el marco de la prestación de los Servicios y en virtud de la Suscripción Anual, Finkargo actúa única y exclusivamente como intermediario, ofreciendo al Usuario acceso a la Información a través de la Plataforma. Para evitar cualquier duda, se aclara la Compra de Reportes Únicos de Información por parte del Usuario no implica la prestación de los Servicios por parte de Finkargo al Usuario.</p>

              <p><strong>(b) Alcance de los Servicios.</strong> Ante la adquisición de los Servicios por parte del Usuario, entendida ésta como el pago del Precio a Finkargo en los términos establecidos para ello en la Cotización de Compra correspondiente, Finkargo proporcionará al Usuario la Credenciales con las cuales éste podrá acceder a la Plataforma durante la Suscripción Anual.</p>

              <p><strong>(c) Términos de la Suscripción Anual.</strong> Una vez culminado la Suscripción Anual, ésta no se renovará de manera automática y, por consiguiente, Finkargo no estará obligado a continuar con la prestación de los Servicios, desactivando así de manera automática las Credenciales y el acceso a la Plataforma. En caso de que el Usuario decida o se encuentre interesado en renovar los Servicios, deberá aceptar una nueva Cotización de Compra enviada por Finkargo y firmar los Términos y Condiciones, en caso de que estos hayan sido actualizados.</p>

              <p><strong>(d) Suspensión de los Servicios.</strong></p>
              <ul className="list-none pl-6 space-y-2">
                <li><strong>(i)</strong> Salvo por los casos establecidos en la Sección 4.02 en los que Finkargo restituirá los días que el Usuario no pueda acceder a la Plataforma, mediante la firma de estos Términos y Condiciones, el Usuario reconoce, declara y acepta que Finkargo podrá suspender y/o interrumpir la prestación de los Servicios en cualquier momento y sin previo aviso al Usuario.</li>
                <li><strong>(ii)</strong> En relación con lo establecido en la Sección 2.01(d)(i), bajo ningún motivo y/o circunstancia Finkargo será responsable por cualquier daño y/o perjuicio que pudiera derivar de la suspensión y/o interrupción de los Servicios. En ese sentido, el Usuario reconoce, declara y acepta que, en el supuesto anterior, Finkargo podrá, más no estará obligado a reembolso y/o compensación por la interrupción y/o suspensión de los Servicios, exceptuando lo previsto en la Sección 4.02.</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección 2.02 - Terminación unilateral y anticipada de los Servicios</h3>
            <p className="mb-6">Solo si es aplicable, el Usuario reconoce y acepta que, en caso en el que por cualquier motivo llegase a incumplir con cualquiera de las obligaciones contraídas bajo los Contratos, Finkargo podrá, sin previo aviso y sin responsabilidad alguna, dar por terminada la prestación de los Servicios.</p>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección 2.03 - Reportes Únicos de Información</h3>
            <p className="mb-8">En concordancia con lo establecido en la Sección 2.01(a), en caso de que el Usuario decida adquirir un Reporte Único de Información, lo establecido en la Sección 2.01(b) no será aplicable y por el contrario Finkargo entregará a Usuario, a través de los medios que considere pertinentes para ello y dentro de los 3 (tres) días hábiles siguientes a que el Usuario haya efectuado el pago del Precio establecido en la factura correspondiente al Reporte Único de Información que aplique. Para evitar cualquier duda, el Usuario declara, reconoce y acepta que en este caso Finkargo no entregará Credencial alguna al Usuario.</p>

            {/* CLÁUSULA III */}
            <h2 className="text-2xl font-bold text-gray-600 mb-6 mt-12">CLÁUSULA III - INFORMACIÓN</h2>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección 3.01 - Origen de la Información; Responsabilidad de Finkargo</h3>
            <div className="mb-6 space-y-4">
              <p><strong>(a)</strong> El Usuario declara, reconoce y acepta que, (i) la totalidad de la Información proporcionada a través de la Plataforma al Usuario proviene de fuentes externas, entendidas éstas como proveedores de datos (nacionales y/o extranjeros), entidades gubernamentales, organismos internacionales y/o terceros proveedores de servicios (cada uno, de manera indistinta un "Proveedor Externo"); y (ii) en la provisión de dicha Información (tanto mediante la Plataforma como en los Reportes Únicos de Información), Finkargo actúa única y exclusivamente como intermediario y/o tercero para poner la misma a disposición del Usuario, sin que ello signifique y/o implique que Finkargo, bajo ningún motivo y/o circunstancia, es responsable por posibles errores, omisiones y/o inexactitudes de la Información y/o los datos contenidos en éstas, así como por la integridad, idoneidad, fiabilidad, disponibilidad y/o actualización de la Información y/o datos en mención, y/o la utilidad que ésta y/o los datos tenga para el Usuario (todas, de manera indistinta, conjunta o separadamente, las "Cualidades de la Información").</p>

              <p><strong>(b)</strong> Para evitar cualquier duda, el Usuario declara, reconoce y acepta que, en ningún momento a partir de la aceptación de estos Términos y Condiciones por parte del Usuario, deberá entenderse que Finkargo funge, es, o actúa como fuente de origen de la Información.</p>

              <p><strong>(c)</strong> El Usuario manifiesta y reconoce que el acceso a la Información y el uso que le dé a ésta es y será única y exclusivamente bajo su propio riesgo; Finkargo bajo ningún motivo será responsable por cualquier pérdida, daño, perjuicio y/o costo que, de manera directa y/o indirecta, derive del uso, mal uso o interpretación de la Información suministrada al Usuario; incluyendo, pero sin limitarse a, daños directos, indirectos, incidentales, especiales, punitivos o consecuenciales, así como la pérdida de beneficios, ingresos, oportunidades comerciales, datos, o cualquier otro tipo de daño económico y/o no económico derivado del uso de la Información. Por consiguiente, el Usuario asume plena responsabilidad por cualquier decisión tomada con base en, derivada o resultante de la Información.</p>
            </div>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección 3.02 - Reclamaciones sobre la Información</h3>
            <p className="mb-6">El Usuario declara, reconoce y acepta que cualquier reclamación relacionada con y/o derivada de las Cualidades de la Información deberá ser única y exclusivamente dirigida a los Proveedores Externos. En este sentido, mediante la firma de los presentes Términos y Condiciones, el Usuario (a) exime a Finkargo de toda responsabilidad al respecto; y (b) renuncia al derecho de reclamar, demandar, denunciar y/o ejercer cualquier tipo de reclamación (ya sea de carácter administrativo, civil, penal o de cualquier tipo) a Finkargo por dichas Cualidades de la Información.</p>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección 3.03 - Información "as is"</h3>
            <p className="mb-8">El Usuario declara, reconoce y acepta que la Información suministrada por Finkargo se proporcionará "as is" y/o "tal como está", entendiendo el Usuario que Finkargo, bajo ninguna circunstancia y/o motivo otorga garantía alguna, ya sea implícita y/o explicita, respecto de las Cualidades de la Información.</p>

            {/* CLÁUSULA IV */}
            <h2 className="text-2xl font-bold text-gray-600 mb-6 mt-12">CLÁUSULA IV - PLATAFORMA</h2>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección 4.01 - Acceso a la Plataforma</h3>
            <div className="mb-6 space-y-4">
              <p><strong>(a)</strong> El Usuario podrá acceder a la Plataforma en cualquier momento del día y desde cualquier dispositivo electrónico, sujetándose a los horarios y días hábiles establecidos en la Sección 6.01.</p>

              <p><strong>(b)</strong> Con el objetivo de controlar el acceso a la Plataforma y proteger la Información, el Usuario debe informar a Finkargo, a través de los medios que para tales efetos Finkargo determine para ello, el nombre completo de las personas que vayan a tener acceso a la Plataforma. Además de cualquier otro dato que Finkargo requiera de tiempo en tiempo.</p>
            </div>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección 4.02 - Actualización de la Plataforma</h3>
            <p className="mb-8">Finkargo se reserva el derecho de modificar y actualizar la Plataforma, así como la Información en ella disponible, sin que para ello sea necesario informarle al Usuario. Sin perjuicio de lo anterior, en caso de fallas en la actualización de la Plataforma, que persistan por más de 90 (noventa) días naturales, el Usuario tendrá derecho a solicitar el reembolso por la Información que no haya sido recibida y acceder a la Plataforma por los días adicionales que sea necesario para efectos de recibir la Información en mención.</p>

            {/* CLÁUSULA V */}
            <h2 className="text-2xl font-bold text-gray-600 mb-6 mt-12">CLÁUSULA V - OBLIGACIONES DE LAS PARTES</h2>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección 5.01 - Obligaciones del Usuario</h3>
            <div className="mb-6 space-y-3">
              <p><strong>(a)</strong> Realizar el pago del Precio por los Servicios y/o el o los Reportes Únicos de Información adquiridos, de acuerdo con lo establecido en la Cotización de Compra correspondiente.</p>

              <p><strong>(b)</strong> No divulgar, vender, ceder, transferir ni compartir, en ninguna circunstancia, la Información y/o el contenido generado, extraído, obtenido o descargado desde la Plataforma y/o los Reportes Únicos de Información, con terceros ajenos al Usuario, exceptuando a sus Afiliadas y/o empleados.</p>

              <p><strong>(c)</strong> Informar acerca de cualquier Incidente, según lo establecido en la Cláusula VI.</p>
            </div>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección 5.02 - Obligaciones de Finkargo</h3>
            <div className="mb-8 space-y-3">
              <p><strong>(a)</strong> Entregar al Usuario las Credenciales necesarias para el acceso a la Plataforma.</p>

              <p><strong>(b)</strong> Prestar los Servicios oportunamente y/o entregar en tiempo al Usuario los Reportes Únicos de Información, según aplique.</p>

              <p><strong>(c)</strong> Prestar soporte técnico y de consultoría en el uso de la Plataforma dentro de los tiempos indicados en la Sección 6.01.</p>

              <p><strong>(d)</strong> Notificar de manera oportuna al Usuario sobre cualquier Incidente, así como informar cuando éste se haya resuelto.</p>
            </div>

            {/* CLÁUSULA VI */}
            <h2 className="text-2xl font-bold text-gray-600 mb-6 mt-12">CLÁUSULA VI - MEDIDAS DE PROTECCIÓN Y SEGURIDAD; SOPORTE</h2>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección 6.01 - Disponibilidad de soporte</h3>
            <p className="mb-6">Para efectos de hacer seguimiento y monitoreo a la Plataforma, el acceso a la Información y la prestación de los Servicios en general, Finkargo contará con soporte y servicio al Usuario de lunes a viernes (siempre y cuando dichos días sean hábiles en México), de 8:00 am a 6:00 pm, hora Ciudad de México.</p>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección 6.02 - Procedimiento para solicitud de soporte</h3>
            <div className="mb-6 space-y-3">
              <p><strong>(a)</strong> El Usuario deberá reportar, a través del Botón de Soporte en la Plataforma, cualquier Incidente, a más tardar dentro de las 24 (veinticuatro) horas hábiles siguientes a la ocurrencia de éste.</p>

              <p><strong>(b)</strong> Para tales efectos, el Usuario deberá completar el formulario que arrojará el Botón de Soporte y adjuntar evidencia y documentación que lo respalde, para que el equipo de soporte de Finkargo pueda determinar el nivel de impacto, la criticidad y la causa origen del Incidente (el "Reporte de Incidente").</p>

              <p><strong>(c)</strong> Una vez el Usuario haya radicado el Reporte de Incidente, el tiempo de respuesta por parte de Finkargo será de 24 (veinticuatro) horas hábiles para enviar el diagnóstico de soporte y comunicar al Usuario las alternativas de solución del Incidente y el tiempo de recuperación de los Servicios de acuerdo con los tiempos definidos en la respuesta correspondiente (la "Respuesta de Diagnóstico").</p>

              <p><strong>(d)</strong> Finkargo llevará a cabo la implementación de la solución del Incidente de acuerdo con el tiempo de recuperación establecido en la Respuesta de Diagnóstico y dará respuesta oficial a través de correo electrónico informando la solución del Incidente (la "Comunicación de Solución").</p>

              <p><strong>(e)</strong> Dentro de los 2 (dos) días hábiles siguientes al recibo de la Comunicación de Solución, el Usuario deberá dar respuesta a la Comunicación de Solución recibida por parte de Finkargo con el fin de cerrar el Incidente. Si transcurridos los 2 (dos) días hábiles siguientes a la recepción de la Comunicación de Solución, el Usuario no ha dado respuesta de confirmación y recibido, la misma se considerará aprobada de forma automática y el Incidente se entenderá resuelto.</p>
            </div>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección 6.03 - Niveles de soporte</h3>
            <div className="mb-6 space-y-3">
              <p><strong>(a) Nivel 1.</strong> Se considera soporte Nivel 1 aquellos relativos a Reportes de Incidentes que estén relacionados con el acceso a la Plataforma y navegación, gestión de Credenciales, configuración de software, o cualquier otra solicitud que tenga relación con soporte front-end.</p>

              <p><strong>(b) Nivel 2.</strong> Se considera soporte Nivel 2 aquellos relativos a Reportes de Incidentes que tengan un mayor grado de complejidad con respecto a la navegación dentro de la Plataforma, inconsistencia en la Información, usabilidad de filtros, dashboards y gráficos.</p>
            </div>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección 6.04 - Plazos de recuperación de los Servicios y valores mínimos aceptables</h3>
            <div className="mb-6 space-y-3">
              <p><strong>(a)</strong> En caso de que el Incidente este de alguna manera relacionado con las Cualidades de la Información o se derive de éstas, Finkargo no es responsable bajo ningún motivo por ello toda vez que, conforme lo establece la Sección 3.01(a), la Información es proporcionada por Proveedores Externos y el Usuario deberá acogerse a los tiempos de recuperación y restablecimiento del Servicio, si es aplicable.</p>

              <p><strong>(b)</strong> Si los Servicios tiene un Incidente distinto al contenido de la Información, los tiempos de respuesta y recuperación dependen de la criticidad del Incidente, categorizados de la siguiente manera:</p>
              <ul className="list-none pl-6 space-y-2">
                <li><strong>(i)</strong> Incidentes Nivel 1: 3 (tres) días hábiles.</li>
                <li><strong>(ii)</strong> Incidentes Nivel 2: 5 (cinco) días hábiles.</li>
              </ul>

              <p><strong>(c)</strong> Finkargo, (i) se reserva la clasificación del Incidente de acuerdo con la criticidad del mismo según Finkargo así lo considere; y (ii) puede demorar más de los plazos establecidos en la Sección 6.04(b)(i) y, Sección 6.04(b)(ii) para dar respuesta y recuperación, sin que exista responsabilidad alguna para ella.</p>
            </div>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección 6.05 - Indicadores y forma de medición de indicadores de calidad del Servicio</h3>
            <p className="mb-6">Como regla general, los Servicios se encontrarán disponibles para acceso a consultas e información los 7 (siete) días de la semana; no obstante lo anterior, la Plataforma contará con una tasa de error del 10% (diez por ciento) en la que el Usuario podría no tener acceso a ésta.</p>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección 6.06 - Persistencia de Incidentes</h3>
            <p className="mb-8">En caso de que la Plataforma cuente con un Incidente que persista durante 1 (uno) o más días hábiles, se recompensará al Usuario prorrogando el tiempo de acceso a la Plataforma por el mismo tiempo de la duración del Incidente.</p>

            {/* CLÁUSULA VII */}
            <h2 className="text-2xl font-bold text-gray-600 mb-6 mt-12">CLÁUSULA VII - MISCELÁNEOS</h2>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección 7.01 - Modificaciones</h3>
            <p className="mb-6">Finkargo podrá limitar, ampliar o modificar a su entera discreción los presentes Términos y Condiciones, previo aviso por escrito al Usuario mediante publicación en la Plataforma. Si transcurridos 5 (cinco) días hábiles contados a partir de la fecha de publicación del respectivo aviso al Usuario en Plataforma, el Usuario no manifiesta expresamente su inconformidad a algún funcionario de Finkargo, se entenderá que acepta incondicionalmente dichas modificaciones, limitaciones, supresiones o adiciones. En caso de que el Usuario manifieste su inconformidad, será a única y entera discreción de Finkargo modificar y/o alterar los Términos y Condiciones.</p>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección 7.02 - Política de Datos Personales</h3>
            <div className="mb-6 space-y-3">
              <p><strong>(a)</strong> En la medida en que, en la adquisición del Servicio, Finkargo no captura, observa, trata, o almacena Datos Personales, sensibles, financieros, créditos, comerciales o de ningún tipo del Usuario, Finkargo no será responsable por el Tratamiento de éstos, independientemente de la calidad que provea el Usuario en la adquisición de los Servicios.</p>

              <p><strong>(b)</strong> En el evento en que Finkargo realice el Tratamiento de los Datos Personales del Usuario, esto lo hará conforme al Aviso de Privacidad incluido en la Plataforma.</p>
            </div>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección 7.03 - Indemnidad</h3>
            <div className="mb-6 space-y-3">
              <p><strong>(a)</strong> El Usuario mantendrá indemne a Finkargo y a sus representantes y/o empleados frente a cualquier costo, gasto o erogación incurridos por éstos con ocasión de la instauración de una demanda, reclamación, litigio, proceso, condena, pleito o acción legal de cualquier tipo, por parte de un Usuario o cualquiera de sus Afiliadas, representantes y/o empleados.</p>

              <p><strong>(b)</strong> El concepto de costo, gasto o erogación, de forma enunciativa más no limitativa, incluye a, las pérdidas, obligaciones, erogaciones, tributos y costos razonables incurridos en la contratación de contadores, abogados y peritos, así como en el pago de honorarios legales, alojamiento y transporte, en la preparación de la defensa en una demanda, reclamación, litigio, proceso, condena, pleito o acción legal.</p>
            </div>

            <h3 className="text-xl font-bold text-gray-600 mb-4">Sección 7.04 - Ley y jurisdicción aplicable</h3>
            <p className="mb-8">Para cualquier acción o reclamación, el lugar en el que se entienden aceptados los presentes Términos y Condiciones será la Ciudad de México y cualquier controversia que surja de su interpretación o aplicación, se someterá a las leyes aplicables en la Ciudad de México.</p>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mt-12">
              <p className="text-blue-800 text-center font-semibold mb-0">
                Acepto de manera irrevocable en todos y cada uno de sus términos el presente documento.
              </p>
            </div>

          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  )
}
