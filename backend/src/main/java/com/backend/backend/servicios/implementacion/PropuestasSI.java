package com.backend.backend.servicios.implementacion;

import com.backend.backend.controlador.respuestas.PropuestaResp;
import com.backend.backend.controlador.solicitud.PropuestaSo;
import com.backend.backend.controlador.solicitud.PropuestaUpSo;
import com.backend.backend.repositorio.PropuestaR;
import com.backend.backend.repositorio.UsuarioR;
import com.backend.backend.repositorio.entidades.Propuesta;
import com.backend.backend.repositorio.entidades.Usuario;
import com.backend.backend.servicios.PropuestaS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PropuestasSI implements PropuestaS {

    @Autowired
    private PropuestaR propuestaR;

    @Autowired
    private UsuarioR usuarioR;

    @Override
    public List<PropuestaResp> listar() {
        List<PropuestaResp> salida = new LinkedList<>();
        propuestaR.findAll().forEach(propuesta -> salida.add(new PropuestaResp(propuesta)));
        return salida;
    }

    @Override
    public List<PropuestaResp> listarPorUsuario(String usuario) {
        return propuestaR.findByAutor_Usuario(usuario).parallelStream().map(PropuestaResp::new).collect(Collectors.toList());
    }

    @Override
    public PropuestaResp add(PropuestaSo propuesta) {
        return new PropuestaResp(propuestaR.save(propuesta.getPropuesta(usuarioR.findByUsuario(propuesta.getAutor()))));
    }

    @Override
    public Integer[] borrar(Integer[] ids) {
        for (Integer id : ids) {
            propuestaR.deleteById(id);
        }
        return ids;
    }

    @Override
    public PropuestaResp update(PropuestaUpSo propuesta) {
        Propuesta oldPropuesta = propuestaR.getById(propuesta.getId());
        oldPropuesta.setNombre(propuesta.getNombre());
        oldPropuesta.setArea(propuesta.getArea());
        oldPropuesta.setDescription(propuesta.getDescripcion());
        oldPropuesta.setCoordinador(new Usuario(propuesta.getIdCoordinador()));
        return new PropuestaResp(propuestaR.save(oldPropuesta));
    }
}
