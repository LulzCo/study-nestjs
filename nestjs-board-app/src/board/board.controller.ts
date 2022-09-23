import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { throws } from 'assert';
import { BoardStatusValidationPipe } from 'src/pipes/board-status-validation.pipe';
import { Board, BoardStatus } from './board.model';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('board')
export class BoardController {
    constructor(private boardService: BoardService) {}

    @Get()
    getAllBoard(): Board[] {
        return this.boardService.getAllBoard();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Board {
        return this.boardService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: string): Board {
        return this.boardService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id: string): Board[] {
        this.boardService.deleteBoard(id);
        return this.boardService.getAllBoard();
    }

    @Patch('/:id/status') 
    updateBoardStatus(
        @Param('id') id: string,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    ) {
        return this.boardService.updateBoardStatus(id, status);
    }


}
